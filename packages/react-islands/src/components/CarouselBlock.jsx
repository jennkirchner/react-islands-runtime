import React from 'react';
import { Island, resolveIslandModule } from 'react-islands-runtime/ssr';

import CarouselSSR from '../carousel/Carousel.ssr.jsx';

export const CarouselBlock = ({
	block,
	className,
	style,
	islandKey = 'carousel',
	hydrate = 'immediate',
	renderStrategy = 'replace',
	resolveModule = resolveIslandModule,
}) => {
	return (
		<section className={className} style={style}>
			<Island
				islandKey={islandKey}
				hydrate={hydrate}
				renderStrategy={renderStrategy}
				props={block}
				resolveIslandModule={resolveModule}
			>
				<CarouselSSR {...block} />
			</Island>
		</section>
	);
};
