import merge from 'lodash/merge';
import memoize from 'lodash/memoize';
import { Styles } from 'jss';
import jss from './setupjss';
import * as theme from './theme';
import * as customTheme from './customTheme';

export default memoize((styles, config: Rsg.StyleguidistConfig, componentName) => {
	const mergedTheme: Rsg.Theme = merge({}, theme, config.theme, customTheme);
	const mergedStyles: Partial<Styles<string>> = merge(
		{},
		styles(mergedTheme),
		config.styles && config.styles[componentName]
	);
	return jss.createStyleSheet(mergedStyles, { meta: componentName, link: true });
});
