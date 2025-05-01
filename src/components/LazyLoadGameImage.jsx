import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

export default function LazyLoadGameImage({ image }) {
    return (
        <LazyLoadImage
            alt="game cover"
            effect="blur"
            src={image}
            className="w-full h-48 object-cover"
            wrapperProps={{
                style: { transitionDelay: "0.5s" },
            }}
        />
    );
}