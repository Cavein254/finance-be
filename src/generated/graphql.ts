import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  JSON: { input: any; output: any; }
};

export type GetNewsSentimentResponse = {
  __typename?: 'GetNewsSentimentResponse';
  data?: Maybe<Array<Maybe<NewsSentiment>>>;
  error?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type GetStockDataResponse = {
  __typename?: 'GetStockDataResponse';
  data?: Maybe<Array<Maybe<StockData>>>;
  error?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type NewsSentiment = {
  __typename?: 'NewsSentiment';
  authors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  banner_image?: Maybe<Scalars['String']['output']>;
  overall_sentiment_score?: Maybe<Scalars['String']['output']>;
  summary?: Maybe<Scalars['String']['output']>;
  time_published?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
  verall_sentiment_label?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  getNewsSentiment?: Maybe<GetNewsSentimentResponse>;
  getTimeSeriesDaily?: Maybe<GetStockDataResponse>;
  getTimeSeriesWeekly?: Maybe<GetStockDataResponse>;
  hello: Scalars['String']['output'];
};


export type QueryGetNewsSentimentArgs = {
  symbol: Scalars['String']['input'];
};


export type QueryGetTimeSeriesDailyArgs = {
  symbol: Scalars['String']['input'];
};


export type QueryGetTimeSeriesWeeklyArgs = {
  symbol: Scalars['String']['input'];
};

export type StockData = {
  __typename?: 'StockData';
  close?: Maybe<Scalars['String']['output']>;
  date?: Maybe<Scalars['String']['output']>;
  high?: Maybe<Scalars['String']['output']>;
  low?: Maybe<Scalars['String']['output']>;
  open?: Maybe<Scalars['String']['output']>;
  volume?: Maybe<Scalars['String']['output']>;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  GetNewsSentimentResponse: ResolverTypeWrapper<GetNewsSentimentResponse>;
  GetStockDataResponse: ResolverTypeWrapper<GetStockDataResponse>;
  JSON: ResolverTypeWrapper<Scalars['JSON']['output']>;
  NewsSentiment: ResolverTypeWrapper<NewsSentiment>;
  Query: ResolverTypeWrapper<{}>;
  StockData: ResolverTypeWrapper<StockData>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Boolean: Scalars['Boolean']['output'];
  GetNewsSentimentResponse: GetNewsSentimentResponse;
  GetStockDataResponse: GetStockDataResponse;
  JSON: Scalars['JSON']['output'];
  NewsSentiment: NewsSentiment;
  Query: {};
  StockData: StockData;
  String: Scalars['String']['output'];
}>;

export type GetNewsSentimentResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['GetNewsSentimentResponse'] = ResolversParentTypes['GetNewsSentimentResponse']> = ResolversObject<{
  data?: Resolver<Maybe<Array<Maybe<ResolversTypes['NewsSentiment']>>>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GetStockDataResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['GetStockDataResponse'] = ResolversParentTypes['GetStockDataResponse']> = ResolversObject<{
  data?: Resolver<Maybe<Array<Maybe<ResolversTypes['StockData']>>>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export type NewsSentimentResolvers<ContextType = any, ParentType extends ResolversParentTypes['NewsSentiment'] = ResolversParentTypes['NewsSentiment']> = ResolversObject<{
  authors?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  banner_image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  overall_sentiment_score?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  summary?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  time_published?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  verall_sentiment_label?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  getNewsSentiment?: Resolver<Maybe<ResolversTypes['GetNewsSentimentResponse']>, ParentType, ContextType, RequireFields<QueryGetNewsSentimentArgs, 'symbol'>>;
  getTimeSeriesDaily?: Resolver<Maybe<ResolversTypes['GetStockDataResponse']>, ParentType, ContextType, RequireFields<QueryGetTimeSeriesDailyArgs, 'symbol'>>;
  getTimeSeriesWeekly?: Resolver<Maybe<ResolversTypes['GetStockDataResponse']>, ParentType, ContextType, RequireFields<QueryGetTimeSeriesWeeklyArgs, 'symbol'>>;
  hello?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
}>;

export type StockDataResolvers<ContextType = any, ParentType extends ResolversParentTypes['StockData'] = ResolversParentTypes['StockData']> = ResolversObject<{
  close?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  date?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  high?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  low?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  open?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  volume?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  GetNewsSentimentResponse?: GetNewsSentimentResponseResolvers<ContextType>;
  GetStockDataResponse?: GetStockDataResponseResolvers<ContextType>;
  JSON?: GraphQLScalarType;
  NewsSentiment?: NewsSentimentResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  StockData?: StockDataResolvers<ContextType>;
}>;

