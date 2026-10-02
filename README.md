# n8n-nodes-parserail

This is an n8n community node for [ParseRail](https://parserail.thecompound.tech), one AI engine exposing 39 finished-job endpoints: documents to schema-valid JSON, field extraction, triage, research, moderation, and agent memory. Every call is a task with a task-named price, drawn from one credit wallet. Failed calls never burn credits.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

[Installation](#installation) · [Operations](#operations) · [Credentials](#credentials) · [Compatibility](#compatibility) · [Usage](#usage) · [Resources](#resources)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation. The package name is:

```
n8n-nodes-parserail
```

If you installed `n8n-nodes-compound` before the 0.4.0 rename, uninstall that deprecated package. Install `n8n-nodes-parserail` in its place. The node and credential keep their names, so existing workflows keep working after the swap.

## Operations

The **ParseRail** node exposes each API endpoint as an operation. Highlights:

- **Document parse**: any invoice, receipt, EOB, ERA, or COI (PDF or image) into structured, validated JSON.
- **Field extraction**: pull a field set you define out of any block of text, typed values with confidence.
- **Triage**: classify and prioritize inbound items against your own labels.
- **Research**: grounded answers over documents you supply.
- **Moderation**: policy checks on user-generated content.
- **Agent memory**: durable key-value memory for agent workflows.

The full, current operation list is generated from the live API catalog. See [parserail.thecompound.tech/docs](https://parserail.thecompound.tech/docs) for every endpoint, its schema, and its credit price. The node is also flagged `usableAsTool`, so n8n AI Agents can call any operation as a tool.

## Credentials

1. Create an account at [parserail.thecompound.tech](https://parserail.thecompound.tech). ParseRail uses prepaid credits: packs start at $20 or plans at $19/month; there is no free tier.
2. Mint an API key (`ksk_live_...`).
3. In n8n, create a **ParseRail API** credential and paste the key.

The credential authenticates as a bearer token and is verified against `/v1/account` on `api.thecompound.tech` when you save it.

## Compatibility

The node requires n8n version 1.0 or later (`n8nNodesApiVersion` 1). Recent n8n releases have been tested. The node has no runtime dependencies beyond `n8n-workflow`.

## Usage

A minimal flow: **Webhook to ParseRail (Document parse) to IF to your system.**

1. Feed the node a PDF/image URL or raw text, depending on the operation.
2. Pick the operation. If the operation takes a schema or field list, define the fields you want back.
3. Downstream nodes receive schema-valid JSON, no free-text parsing.

Failed calls return an error object. Failed calls are not billed, so retry loops are safe.

## Resources

- [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
- [ParseRail API docs](https://parserail.thecompound.tech/docs)
- [Endpoint catalog and pricing](https://parserail.thecompound.tech)

## Version history

- **0.4.0**: renamed the package to `n8n-nodes-parserail` and the repository to `kyisaiah47/n8n-nodes-parserail`. `n8n-nodes-compound` is deprecated with a pointer to this package. No functional changes.
- Version **0.3.4** renamed every internal identifier from the retired studio name. After the 0.3.0 package rename, the node class, credential class, internal node and credential names, display names, file names, and icon files still used the retired name. The node is `ParseRail`. The credential is `ParseRail API`. The icon is the real ParseRail mark from the brand registry, not a placeholder.
- Version **0.3.3** moved every live API reference from the retired studio API domain to `api.thecompound.tech` and `parserail.thecompound.tech`. Version 0.3.3 also rewrote the README. The README still titled and instructed readers to install the deprecated old-name package.
- Version **0.3.2** fixed the cause of n8n's automated-review rejection. The node class's `description` was a bare identifier, not an inline object literal. n8n's icon-validation rule treated the node as having no icon regardless of what the identifier held. Version 0.3.2 added the `usableAsTool` field. It also moved every live API reference from the retired studio API domain to `api.thecompound.tech` and `parserail.thecompound.tech`.
- **0.3.1**: themed `{ light, dark }` icon on the node and credential classes.
- **0.3.0**: renamed the package to `n8n-nodes-compound` and the publisher identity to Compound Labs.
- **0.2.4**: the icon the node has always declared and never shipped.
- **0.2.3**: three changes n8n's manual review asked for, fixed in the generator.
- **0.1.1**: README and n8n verification submission. No functional changes.
- **0.1.0**: initial release, full endpoint catalog as operations, bearer credential, AI-tool support.
