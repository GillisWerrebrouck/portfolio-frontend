import React from 'react';
import GoogleAnalytics from 'react-ga';

GoogleAnalytics.initialize('UA-114357461-1' /*, {debug : true}*/);

const GoogleAnalyticsTracking = (WrappedComponent) => {
    const trackPage = (page) => {
        GoogleAnalytics.set({ page });
        GoogleAnalytics.pageview(page);
    };

    const HOC = (props) => {
        const page = props.location.pathname;
        // TODO: disable on dev
        trackPage(page);

        return (
            <WrappedComponent {...props} />
        );
    };

    return HOC;
};

export default GoogleAnalyticsTracking;