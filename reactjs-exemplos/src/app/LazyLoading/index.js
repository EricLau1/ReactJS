import React, {Suspense, lazy} from 'react';

const Title = lazy(() => {
    return new Promise(resolve => {
      setTimeout(() => resolve(import('../components/Title')), 2000)
    });
});

const Loading = props => (<div>Loading...</div>);
  
const LazyLoadingExample = props => {
    return (
        <Suspense fallback={<Loading />}>
            <Title title="Lazy loading" />
        </Suspense>
    );
};

export default LazyLoadingExample;
