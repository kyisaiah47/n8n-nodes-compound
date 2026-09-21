// Kynth Core node for n8n — declarative (routing-based). The full operation
// catalog and every per-operation field live in description.ts, which is
// GENERATED from the API's own endpoint catalog (apps/api scripts/
// generate-clients.ts), so the node can never drift from the live API.

import type { Icon, INodeType, INodeTypeDescription } from 'n8n-workflow';
import { kynthNodeDescription } from './description';

export class KynthCore implements INodeType {
	// n8n's manual review (2026-08-17, v0.2.3) required this even though
	// kynthNodeDescription already carries an icon field. The linter rule
	// `@n8n/community-nodes/icon-validation` reads the CLASS, not the description it
	// points at. The svg it names did not exist in the package at all until now, so the
	// node also shipped iconless. Both halves are fixed together.
	//
	// n8n's manual review (2026-09-21, on v0.3.0) escalated this: a single-file icon on
	// the node class no longer satisfies icon-validation at all, it must be the themed
	// { light, dark } form. Same SVG for both until separate variants exist.
	icon: Icon = { light: 'file:kynth.svg', dark: 'file:kynth.svg' };

	description: INodeTypeDescription = kynthNodeDescription;
}
