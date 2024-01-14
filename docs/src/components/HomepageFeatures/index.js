import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'REST API',
    img: "/img/rest.png",
    description: (
      <>
        VibeCheck allows you to <strong>rate comments</strong> based on whether 
        they convey <strong>good or bad vibes</strong> through the REST API.
      </>
    ),
  },
  {
    title: 'Artificial Intelligente',
    img: "/img/ai.png",
    description: (
      <>
        VibeCheck uses <strong>artificial intelligence</strong> (Natural) to rate comments.
      </>
    ),
  },
  {
    title: 'Client library',
    img: "/img/library.png",
    description: (
      <>
        You can install a node.js package for easy integration with the VibeCheck API.
      </>
    ),
  },
];

function Feature({Svg, img, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center" style={{ overflow: "hidden", maxWidth: "200px", margin: "20px auto" }}>
        <img src={img} style={{ height: "120px"}} />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
