# Webhook smee.io POC

Proof of concept for receiving GitHub webhooks via smee.io.

## Setup

1. Go to https://smee.io/new to create a channel
2. Set environment variable: `export SMEE_URL=https://smee.io/your-channel`
3. Add the URL as a webhook in a GitHub repository

## Run

```bash
cd poc/webhook-smee
npm install
npx ts-node index.ts
```

## Configure GitHub Webhook

1. Go to repo Settings > Webhooks > Add webhook
2. Payload URL: Your smee.io URL
3. Content type: application/json
4. Select events: "Send me everything" or specific events
5. Active: checked

## Expected Output

```
Listening for webhooks at: https://smee.io/abc123

[push]
  Repository: owner/repo
  Sender: username
  Commits: 3
  Ref: refs/heads/main
```

## See Also

- [Spike Documentation](../../docs/spikes/002-webhook-smee.md)
- [smee.io](https://smee.io)
- [smee-client](https://github.com/probot/smee-client)
