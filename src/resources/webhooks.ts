import { Resource } from '@modelcontextprotocol/sdk/types.js';
import { eventQueue, WebhookEvent } from '../webhooks/event-queue.js';

export interface WebhookResourceContents {
  uri: string;
  mimeType: string;
  text: string;
}
import { getSmeeUrl } from '../webhooks/smee-client.js';

/**
 * Get all webhook-related resources
 */
export function getWebhookResources(): Resource[] {
  const resources: Resource[] = [];

  // Status resource
  resources.push({
    uri: 'github://webhooks/status',
    name: 'Webhook Status',
    description: 'Current webhook listener status and event counts',
    mimeType: 'application/json',
  });

  // All events resource
  resources.push({
    uri: 'github://webhooks/all',
    name: 'All Events',
    description: 'All recent webhook events',
    mimeType: 'application/json',
  });

  // Per-type resources for active types
  const activeTypes = eventQueue.getEventTypes();
  for (const type of activeTypes) {
    resources.push({
      uri: `github://webhooks/events/${type}`,
      name: `${formatEventType(type)} Events`,
      description: `Recent ${type} webhook events`,
      mimeType: 'application/json',
    });
  }

  // Common types (even if not yet received)
  const commonTypes = ['push', 'pull_request', 'issues', 'issue_comment', 'release', 'workflow_run', 'check_run'];
  for (const type of commonTypes) {
    if (!activeTypes.includes(type)) {
      resources.push({
        uri: `github://webhooks/events/${type}`,
        name: `${formatEventType(type)} Events`,
        description: `Recent ${type} webhook events (waiting for events)`,
        mimeType: 'application/json',
      });
    }
  }

  return resources;
}

/**
 * Read a webhook resource
 */
export function readWebhookResource(uri: string): WebhookResourceContents {
  // Status resource
  if (uri === 'github://webhooks/status') {
    const status = {
      connected: getSmeeUrl() !== null,
      smeeUrl: getSmeeUrl(),
      eventCounts: eventQueue.getCounts(),
      totalEvents: eventQueue.getAll().length,
      activeEventTypes: eventQueue.getEventTypes(),
    };

    return {
      uri,
      mimeType: 'application/json',
      text: JSON.stringify(status, null, 2),
    };
  }

  // All events resource
  if (uri === 'github://webhooks/all') {
    const events = eventQueue.getAll(100);
    return {
      uri,
      mimeType: 'application/json',
      text: JSON.stringify(formatEvents(events), null, 2),
    };
  }

  // Type-specific resource
  const typeMatch = uri.match(/^github:\/\/webhooks\/events\/(.+)$/);
  if (typeMatch) {
    const type = typeMatch[1];
    const events = eventQueue.getByType(type, 100);
    return {
      uri,
      mimeType: 'application/json',
      text: JSON.stringify(formatEvents(events), null, 2),
    };
  }

  // Legacy format support
  const legacyMatch = uri.match(/^github:\/\/webhooks\/(.+)$/);
  if (legacyMatch && legacyMatch[1] !== 'status') {
    const type = legacyMatch[1];
    if (type === 'all') {
      const events = eventQueue.getAll(100);
      return {
        uri,
        mimeType: 'application/json',
        text: JSON.stringify(formatEvents(events), null, 2),
      };
    }
    const events = eventQueue.getByType(type, 100);
    return {
      uri,
      mimeType: 'application/json',
      text: JSON.stringify(formatEvents(events), null, 2),
    };
  }

  return {
    uri,
    mimeType: 'application/json',
    text: JSON.stringify({ error: 'Unknown resource' }),
  };
}

/**
 * Format events for output
 */
function formatEvents(events: WebhookEvent[]): object {
  return {
    count: events.length,
    events: events.map(event => ({
      id: event.id,
      type: event.type,
      action: event.action,
      receivedAt: event.receivedAt.toISOString(),
      repository: event.repository?.full_name,
      sender: event.sender?.login,
      summary: getEventSummary(event),
    })),
  };
}

/**
 * Get a human-readable summary of an event
 */
function getEventSummary(event: WebhookEvent): string {
  const { type, action, payload, sender, repository } = event;
  const by = sender?.login ? ` by ${sender.login}` : '';
  const repo = repository?.full_name ? ` in ${repository.full_name}` : '';

  switch (type) {
    case 'push': {
      const commits = (payload.commits as unknown[])?.length || 0;
      const ref = (payload.ref as string)?.replace('refs/heads/', '') || 'unknown';
      return `${commits} commit(s) pushed to ${ref}${by}${repo}`;
    }
    case 'pull_request': {
      const prNumber = (payload.number as number) || '?';
      const prTitle = (payload.pull_request as Record<string, unknown>)?.title || '';
      return `PR #${prNumber} ${action}${by}: ${prTitle}`;
    }
    case 'issues': {
      const issueNumber = (payload.issue as Record<string, unknown>)?.number || '?';
      const issueTitle = (payload.issue as Record<string, unknown>)?.title || '';
      return `Issue #${issueNumber} ${action}${by}: ${issueTitle}`;
    }
    case 'issue_comment': {
      const issueNumber = (payload.issue as Record<string, unknown>)?.number || '?';
      return `Comment ${action} on issue #${issueNumber}${by}`;
    }
    case 'release': {
      const tagName = (payload.release as Record<string, unknown>)?.tag_name || '?';
      return `Release ${tagName} ${action}${by}${repo}`;
    }
    case 'workflow_run': {
      const workflowName = (payload.workflow_run as Record<string, unknown>)?.name || 'workflow';
      const conclusion = (payload.workflow_run as Record<string, unknown>)?.conclusion || action;
      return `${workflowName} ${conclusion}${repo}`;
    }
    case 'check_run': {
      const checkName = (payload.check_run as Record<string, unknown>)?.name || 'check';
      const conclusion = (payload.check_run as Record<string, unknown>)?.conclusion || action;
      return `${checkName} ${conclusion}${repo}`;
    }
    case 'create':
    case 'delete': {
      const refType = payload.ref_type || 'ref';
      const ref = payload.ref || '?';
      return `${refType} ${ref} ${type}d${by}${repo}`;
    }
    case 'fork': {
      const forkee = (payload.forkee as Record<string, unknown>)?.full_name || '?';
      return `Forked to ${forkee}${by}`;
    }
    case 'star': {
      return `Repository ${action}red${by}`;
    }
    default:
      return `${type}${action ? ` (${action})` : ''}${by}${repo}`;
  }
}

/**
 * Format event type for display
 */
function formatEventType(type: string): string {
  return type
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
