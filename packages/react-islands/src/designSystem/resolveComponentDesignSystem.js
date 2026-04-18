const joinClassNames = (...values) => values.filter(Boolean).join(' ');

const mergeStyles = (...styles) => {
	const merged = Object.assign({}, ...styles.filter(Boolean));
	return Object.keys(merged).length ? merged : undefined;
};

export const resolveComponentDesignSystem = ({
	componentName,
	designSystem,
	className,
	style,
	defaultClassName = '',
	defaultAttrs = {},
}) => {
	const globalConfig = designSystem?.components?.all || {};
	const componentConfig = designSystem?.components?.[componentName] || {};
	const attrs = {
		...(designSystem?.attrs || {}),
		...(globalConfig.attrs || {}),
		...(componentConfig.attrs || {}),
		...defaultAttrs,
	};

	if (designSystem?.name && !attrs['data-design-system']) {
		attrs['data-design-system'] = designSystem.name;
	}

	if (!attrs['data-design-component']) {
		attrs['data-design-component'] = componentName;
	}

	return {
		className: joinClassNames(
			defaultClassName,
			designSystem?.className,
			globalConfig.className,
			componentConfig.className,
			className,
		),
		style: mergeStyles(designSystem?.style, globalConfig.style, componentConfig.style, style),
		attrs,
	};
};
