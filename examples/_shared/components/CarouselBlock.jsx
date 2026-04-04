import React from 'react';
import { Island } from 'react-islands-runtime/ssr';

import CarouselSSR from '../runtime/src/islands/Carousel.ssr.jsx';
import { resolveIslandModule } from '../runtime/src/server/islands/resolveIslandModule.js';

export const CarouselBlock = ({ block, className, style }) => {
	return (
		<section className={className} style={style}>
			<Island islandKey="carousel" hydrate="immediate" props={block} resolveIslandModule={resolveIslandModule}>
				<CarouselSSR {...block} />
			</Island>
		</section>
	);
};
