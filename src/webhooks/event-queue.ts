import { EventEmitter } from 'events';

export interface WebhookEvent {
  id: string;
  type: string;
  action?: string;
  payload: Record<string, unknown>;
  receivedAt: Date;
  repository?: {
    owner: string;
    name: string;
    full_name: string;
  };
  sender?: {
    login: string;
    id: number;
  };
}

const MAX_EVENTS_PER_TYPE = 100;

class EventQueue extends EventEmitter {
  private events: Map<string, WebhookEvent[]> = new Map();
  private allEvents: WebhookEvent[] = [];

  /**
   * Add an event to the queue
   */
  push(event: WebhookEvent): void {
    // Add to all events
    this.allEvents.unshift(event);
    if (this.allEvents.length > MAX_EVENTS_PER_TYPE * 10) {
      this.allEvents = this.allEvents.slice(0, MAX_EVENTS_PER_TYPE * 10);
    }

    // Add to type-specific queue
    const typeEvents = this.events.get(event.type) || [];
    typeEvents.unshift(event);
    if (typeEvents.length > MAX_EVENTS_PER_TYPE) {
      typeEvents.pop();
    }
    this.events.set(event.type, typeEvents);

    // Emit event for subscribers
    this.emit('event', event);
    this.emit(event.type, event);
  }

  /**
   * Get events by type
   */
  getByType(type: string, limit = 50): WebhookEvent[] {
    const events = this.events.get(type) || [];
    return events.slice(0, limit);
  }

  /**
   * Get all events
   */
  getAll(limit = 50): WebhookEvent[] {
    return this.allEvents.slice(0, limit);
  }

  /**
   * Get events by repository
   */
  getByRepo(owner: string, repo: string, limit = 50): WebhookEvent[] {
    return this.allEvents
      .filter(e => e.repository?.owner === owner && e.repository?.name === repo)
      .slice(0, limit);
  }

  /**
   * Get available event types
   */
  getEventTypes(): string[] {
    return Array.from(this.events.keys());
  }

  /**
   * Clear all events
   */
  clear(): void {
    this.events.clear();
    this.allEvents = [];
  }

  /**
   * Get event counts by type
   */
  getCounts(): Record<string, number> {
    const counts: Record<string, number> = {};
    for (const [type, events] of this.events) {
      counts[type] = events.length;
    }
    return counts;
  }
}

// Singleton instance
export const eventQueue = new EventQueue();

// Common webhook event types
export const EVENT_TYPES = [
  'push',
  'pull_request',
  'pull_request_review',
  'pull_request_review_comment',
  'issues',
  'issue_comment',
  'create',
  'delete',
  'fork',
  'release',
  'workflow_run',
  'workflow_job',
  'check_run',
  'check_suite',
  'deployment',
  'deployment_status',
  'discussion',
  'discussion_comment',
  'label',
  'milestone',
  'project',
  'project_card',
  'project_column',
  'public',
  'star',
  'watch',
  'repository',
  'team',
  'team_add',
  'member',
  'membership',
  'organization',
  'org_block',
  'package',
  'page_build',
  'ping',
  'sponsorship',
  'status',
  'commit_comment',
  'gollum', // wiki events
  'meta',
] as const;

export type EventType = typeof EVENT_TYPES[number];
