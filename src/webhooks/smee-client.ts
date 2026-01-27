import SmeeClient from 'smee-client';
import { eventQueue, WebhookEvent } from './event-queue.js';
import { Resource } from '@modelcontextprotocol/sdk/types.js';

let smeeClient: SmeeClient | null = null;
let smeeUrl: string | null = null;

/**
 * Start the smee.io webhook client
 */
export function startWebhookClient(url: string): void {
  if (smeeClient) {
    console.error('Webhook client already running');
    return;
  }

  smeeUrl = url;

  smeeClient = new SmeeClient({
    source: url,
    target: 'http://localhost:0/webhook', // Dummy target, we intercept events
    logger: {
      info: (msg: string) => console.error(`[smee] ${msg}`),
      error: (msg: string) => console.error(`[smee:error] ${msg}`),
    },
  });

  const events = smeeClient.start();

  events.addEventListener('message', (event: MessageEvent) => {
    try {
      const data = JSON.parse(event.data);
      handleWebhookEvent(data);
    } catch {
      // Ignore parsing errors
    }
  });

  events.addEventListener('error', () => {
    console.error('[smee:error] Connection error');
  });

  console.error(`Webhook client started: ${url}`);
}

/**
 * Stop the webhook client
 */
export function stopWebhookClient(): void {
  if (smeeClient) {
    // SmeeClient doesn't have a stop method, but we can clear the reference
    smeeClient = null;
    smeeUrl = null;
    console.error('Webhook client stopped');
  }
}

/**
 * Get the current smee URL
 */
export function getSmeeUrl(): string | null {
  return smeeUrl;
}

/**
 * Handle incoming webhook event
 */
function handleWebhookEvent(rawEvent: Record<string, unknown>): void {
  try {
    const eventType = rawEvent['x-github-event'] as string || 'unknown';
    const deliveryId = rawEvent['x-github-delivery'] as string || crypto.randomUUID();
    const body = rawEvent.body as Record<string, unknown> || rawEvent;

    const event: WebhookEvent = {
      id: deliveryId,
      type: eventType,
      action: body.action as string | undefined,
      payload: body,
      receivedAt: new Date(),
      repository: body.repository ? {
        owner: (body.repository as Record<string, unknown>).owner
          ? ((body.repository as Record<string, unknown>).owner as Record<string, unknown>).login as string
          : '',
        name: (body.repository as Record<string, unknown>).name as string || '',
        full_name: (body.repository as Record<string, unknown>).full_name as string || '',
      } : undefined,
      sender: body.sender ? {
        login: (body.sender as Record<string, unknown>).login as string || '',
        id: (body.sender as Record<string, unknown>).id as number || 0,
      } : undefined,
    };

    eventQueue.push(event);

    const action = event.action ? ` (${event.action})` : '';
    const repo = event.repository?.full_name ? ` in ${event.repository.full_name}` : '';
    console.error(`[webhook] ${eventType}${action}${repo}`);
  } catch (error) {
    console.error('[webhook:error] Failed to process event:', error);
  }
}

/**
 * Get webhook resources for MCP
 */
export function getWebhookResources(): Resource[] {
  const resources: Resource[] = [
    {
      uri: 'github://webhooks/all',
      name: 'All Webhook Events',
      description: 'All recent webhook events from GitHub',
      mimeType: 'application/json',
    },
  ];

  // Add resources for each event type that has events
  const eventTypes = eventQueue.getEventTypes();
  for (const type of eventTypes) {
    resources.push({
      uri: `github://webhooks/${type}`,
      name: `${type} Events`,
      description: `Recent ${type} webhook events`,
      mimeType: 'application/json',
    });
  }

  // Add common event types even if empty
  const commonTypes = ['push', 'pull_request', 'issues', 'issue_comment', 'release', 'workflow_run'];
  for (const type of commonTypes) {
    if (!eventTypes.includes(type)) {
      resources.push({
        uri: `github://webhooks/${type}`,
        name: `${type} Events`,
        description: `Recent ${type} webhook events (none received yet)`,
        mimeType: 'application/json',
      });
    }
  }

  return resources;
}

/**
 * Get webhook events for a resource URI
 */
export function getWebhookEvents(uri: string): WebhookEvent[] | Record<string, unknown> {
  const match = uri.match(/^github:\/\/webhooks\/(.+)$/);
  if (!match) {
    return { error: 'Invalid webhook resource URI' };
  }

  const type = match[1];

  if (type === 'all') {
    return eventQueue.getAll();
  }

  return eventQueue.getByType(type);
}

/**
 * Generate a new smee.io channel URL
 */
export async function createSmeeChannel(): Promise<string> {
  const response = await fetch('https://smee.io/new', {
    method: 'HEAD',
    redirect: 'manual',
  });

  const location = response.headers.get('location');
  if (!location) {
    throw new Error('Failed to create smee.io channel');
  }

  return location;
}
