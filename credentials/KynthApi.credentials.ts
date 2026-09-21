// Kynth Core API credentials for n8n — one bearer key (ksk_live_…) opens all
// 39 endpoints. Mint keys at https://api.kynth.studio/dashboard; every account
// gets 500 free credits a month, no card.

import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	Icon,
	INodeProperties,
} from 'n8n-workflow';

export class KynthApi implements ICredentialType {
	name = 'kynthApi';

	displayName = 'Kynth Core API';

	// n8n's manual review (2026-08-17, v0.2.3) failed on exactly this line being absent:
	// `@n8n/community-nodes/cred-class-field-icon-missing`. The credential class must
	// declare its own icon as a TOP-LEVEL CLASS PROPERTY, not only inside a description
	// object. `file:` resolves beside the compiled class, so credentials/kynth.svg is
	// copied into dist/credentials by the build. Reproduce with
	// `npx @n8n/scan-community-package@beta n8n-nodes-compound`.
	//
	// n8n's manual review (2026-09-21, on v0.3.0) recommended the themed { light, dark }
	// form here too, for consistency with the now-required node-class format. Same SVG
	// for both until separate variants exist.
	icon: Icon = { light: 'file:kynth.svg', dark: 'file:kynth.svg' };

	documentationUrl = 'https://api.kynth.studio/docs';

	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			description:
				'Your Kynth Core key (ksk_live_…). Mint one at api.kynth.studio/dashboard — 500 free credits every month, no card.',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer {{$credentials.apiKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://api.kynth.studio',
			url: '/v1/account',
		},
	};
}
