import { getDefaultConfig } from "expo/metro-config";

const config = (() => {
  const config = getDefaultConfig(__dirname);

  const { transformer, resolver } = config;

  if (!resolver) {
    throw new Error("Metro config resolver is undefined");
  }

  return {
    ...config,
    transformer: {
      ...transformer,
      babelTransformerPath: require.resolve("react-native-svg-transformer"),
    },
    resolver: {
      ...resolver,
      assetExts: resolver.assetExts?.filter((ext: string) => ext !== "svg"),
      sourceExts: [...(resolver.sourceExts || []), "svg"],
    },
  };
})();

export default config;
