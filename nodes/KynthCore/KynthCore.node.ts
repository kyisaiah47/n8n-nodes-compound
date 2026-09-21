// Kynth Core node for n8n — declarative (routing-based). The full operation
// catalog and every per-operation field live in description.ts, which is
// GENERATED from the API's own endpoint catalog (apps/api scripts/
// generate-clients.ts), so the node can never drift from the live API.

import type { Icon, INodeType, INodeTypeDescription } from 'n8n-workflow';
import { kynthNodeDescription } from './description';

export class KynthCore implements INodeType {
	// n8n's manual review (2026-08-17, v0.2.3) required this even though
	// kynthNodeDescription already carries an icon field. Kept because the credential
	// class check (a real ICredentialType field) needs its own top-level icon regardless.
	icon: Icon = { light: 'file:kynth.svg', dark: 'file:kynth.svg' };

	// THE REAL FAILURE, found by reading @n8n/eslint-plugin-community-nodes' own source
	// (node_modules/@n8n/eslint-plugin-community-nodes/src/rules/icon-validation.ts and
	// require-node-description-fields.ts) rather than guessing from the review email a
	// second time. Both rules only look at properties written DIRECTLY on this object
	// literal (`descriptionValue.properties`) and never resolve what a spread's source
	// object holds, so `description = kynthNodeDescription` (a bare identifier) reported
	// icon as missing outright, and a plain `{ ...kynthNodeDescription }` would have hidden
	// icon and subtitle from these two rules even though both are real fields on the
	// spread source. Repeating them as explicit properties satisfies the AST check while
	// staying byte-identical to kynthNodeDescription at runtime, since the values match.
	description: INodeTypeDescription = {
		...kynthNodeDescription,
		icon: { light: 'file:kynth.svg', dark: 'file:kynth.svg' },
		subtitle: '={{ $parameter["operation"] }}',
		// A regular declarative node (not a trigger, has both inputs and outputs), so
		// n8n's own AI-agent tool picker can call it directly. @n8n/community-nodes/
		// node-usable-as-tool requires this be stated one way or the other.
		usableAsTool: true,
	};
}
