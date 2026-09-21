# n8n-nodes-compound

This is an n8n community node for [ParseRail](https://parserail.thecompound.tech), one AI engine exposing 39 finished-job endpoints: documents to schema-valid JSON, field extraction, triage, research, moderation, and agent memory. Every call is a task with a task-named price, drawn from one credit wallet. Failed calls never burn credits.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

[Installation](#installation) · [Operations](#operations) · [Credentials](#credentials) · [Compatibility](#compatibility) · [Usage](#usage) · [Resources](#resources)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation. The package name is:

```
n8n-nodes-compound
```

Installed before the 0.3.0 rename? The old package name `n8n-nodes-kynth` is deprecated; uninstall it and install `n8n-nodes-compound` in its place.

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

1. Create an account at [parserail.thecompound.tech](https://parserail.thecompound.tech). Every account includes 500 free credits per month, no card required.
2. Mint an API key (`ksk_live_...`).
3. In n8n, create a **ParseRail API** credential and paste the key.

The credential authenticates as a bearer token and is verified against `/v1/account` on `api.thecompound.tech` when you save it.

## Compatibility

Requires n8n version 1.0 or later (`n8nNodesApiVersion` 1). Tested against recent n8n releases; the node has no runtime dependencies beyond `n8n-workflow`.

## Usage

A minimal flow: **Webhook to ParseRail (Document parse) to IF to your system.**

1. Feed the node a PDF/image URL or raw text, depending on the operation.
2. Pick the operation and, where the operation takes a schema or field list, define the fields you want back.
3. Downstream nodes receive schema-valid JSON, no free-text parsing.

Failed calls return an error object and are not billed, so retry loops are safe.

## Resources

- [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
- [ParseRail API docs](https://parserail.thecompound.tech/docs)
- [Endpoint catalog and pricing](https://parserail.thecompound.tech)

## Version history

- **0.3.4**: renamed every internal identifier off Kynth. The node class, the credential class, the internal node and credential names (`kynthCore`/`kynthApi`), the display names, the file names, and the icon files were all still Kynth-branded after the 0.3.0 package rename. The node is `ParseRail`, the credential is `ParseRail API`, and the icon is the real ParseRail mark from the brand registry, not a placeholder.
- **0.3.3**: moved every live API reference off the retired `api.kynth.studio` domain onto `api.thecompound.tech` and `parserail.thecompound.tech`, and rewrote the README, which still titled and instructed installing the deprecated `n8n-nodes-kynth` package name.
- **0.3.2**: fixed the real cause of n8n's automated-review rejection (the node class's `description` was a bare identifier, not an inline object literal, which n8n's icon-validation rule treats as having no icon at all regardless of what the identifier holds), added the `usableAsTool` field, and moved every live API reference off the retired `api.kynth.studio` domain onto `api.thecompound.tech` and `parserail.thecompound.tech`.
- **0.3.1**: themed `{ light, dark }` icon on the node and credential classes.
- **0.3.0**: renamed the package to `n8n-nodes-compound` and the publisher identity to Compound Labs.
- **0.2.4**: the icon the node has always declared and never shipped.
- **0.2.3**: three changes n8n's manual review asked for, fixed in the generator.
- **0.1.1**: README and n8n verification submission. No functional changes.
- **0.1.0**: initial release, full endpoint catalog as operations, bearer credential, AI-tool support.
