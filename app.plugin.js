const configPlugins = require("@expo/config-plugins");

function withHomeIndicator(outerConfig) {
    return configPlugins.withAppDelegate(outerConfig, async (config) => {
        let res = config.modResults;

        if (!res.contents.includes("#import <RNHomeIndicator.h>")) {
            res.contents = res.contents.replace(
                /#import "AppDelegate.h"/,
                `#import "AppDelegate.h"\n#import <RNHomeIndicator.h>\n`
            );
        }

        if (!res.contents.includes("HomeIndicatorViewController")) {
            res.contents = res.contents.replace(
                /UIViewController \*rootViewController = \[self.reactDelegate createRootViewController\];/g,
                // /UIViewController *rootViewController = [UIViewController new];/g,
                `UIViewController *rootViewController = [HomeIndicatorViewController new];`
            );
        }

        return config;
    });
}

module.exports = withHomeIndicator;
