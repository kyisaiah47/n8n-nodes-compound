// Kynth Core API credentials for n8n. One bearer key (ksk_live_...) opens all
// 39 endpoints. Mint keys at https://parserail.thecompound.tech, every account
// gets 500 free credits a month, no card.
//
// api.kynth.studio still answers (measured 2026-09-21: 308 to
// parserail.thecompound.tech), but it is a redirect hop through a retired
// domain, not the live host. api.thecompound.tech answers the same routes
// directly (measured the same day: 401 with no key, 200 with a real one).

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

	documentationUrl = 'https://parserail.thecompound.tech/docs';

	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			description:
				'Your Kynth Core key (ksk_live_...). Mint one at parserail.thecompound.tech, 500 free credits every month, no card.',
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
			baseURL: 'https://api.thecompound.tech',
			url: '/v1/account',
		},
	};
}
