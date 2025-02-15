import { aevatarAI } from "../../utils";
import type { IConfig } from "@aevatar-react-sdk/types";
import { BaseAsyncStorage } from "../../utils/asyncStorage";
interface IConfigProviderProps extends IConfig {}
const defaultConfig: IConfigProviderProps = {};

class ConfigProviderInstance {
	config: IConfigProviderProps;
	constructor(config: IConfigProviderProps) {
		this.config = config;
	}

	setConfig = (_config: Omit<Partial<IConfigProviderProps>, "theme">) => {
		if (
			("storageMethod" in _config && _config.storageMethod) ||
			!this.config.storageMethod
		) {
			const storageMethod = _config.storageMethod || new BaseAsyncStorage();
			aevatarAI.setConfig({
				storageMethod,
			});
		}

		if ("requestDefaults" in _config) {
			const requestDefaults = _config.requestDefaults;
			if (requestDefaults) {
				if (!requestDefaults.headers) requestDefaults.headers = {};
				aevatarAI.setConfig({ requestDefaults: requestDefaults });
			}
		}

		if ("graphQLUrl" in _config) {
			aevatarAI.setConfig({
				graphQLUrl: _config.graphQLUrl,
			});
		}
		if ("connectUrl" in _config) {
			aevatarAI.setConfig({
				connectUrl: _config.connectUrl,
			});
		}

		this.config = { ...this.config, ..._config };
	};
}

export const ConfigProvider = new ConfigProviderInstance(defaultConfig);
