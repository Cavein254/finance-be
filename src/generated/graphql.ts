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
  BigInt: { input: any; output: any; }
  Date: { input: any; output: any; }
  JSON: { input: any; output: any; }
};

/** Input for creating a new Portfolio */
export type CreatePortfolio = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  totalInvestment?: InputMaybe<Scalars['Float']['input']>;
  userId: Scalars['String']['input'];
};

/** Response after creating a portfolio */
export type CreateResponse = {
  __typename?: 'CreateResponse';
  error?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

/** Input for creating a new Stock Entry */
export type CreateStockEntry = {
  currentPrice: Scalars['Float']['input'];
  name: Scalars['String']['input'];
  portfolioId: Scalars['String']['input'];
  purchaseDate?: InputMaybe<Scalars['String']['input']>;
  purchasePrice?: InputMaybe<Scalars['Float']['input']>;
  quantity?: InputMaybe<Scalars['Float']['input']>;
  ticker: Scalars['String']['input'];
  totalValue: Scalars['Float']['input'];
};

/** Return for user portfolios */
export type GetPortfolioResults = {
  __typename?: 'GetPortfolioResults';
  data?: Maybe<Array<Maybe<Portfolio>>>;
  error?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

/** The results of stocks array */
export type GetStockDataResponse = {
  __typename?: 'GetStockDataResponse';
  data?: Maybe<Array<Maybe<StockData>>>;
  error?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createPortfolio?: Maybe<CreateResponse>;
  createStockEntry?: Maybe<CreateResponse>;
};


export type MutationCreatePortfolioArgs = {
  input?: InputMaybe<CreatePortfolio>;
};


export type MutationCreateStockEntryArgs = {
  input?: InputMaybe<CreateStockEntry>;
};

/** A Portfolio object */
export type Portfolio = {
  __typename?: 'Portfolio';
  createdAt?: Maybe<Scalars['Date']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  name?: Maybe<Scalars['String']['output']>;
  stocks?: Maybe<Array<Maybe<Stock>>>;
  totalInvestment?: Maybe<Scalars['Float']['output']>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
  user?: Maybe<User>;
};

export type Query = {
  __typename?: 'Query';
  getAllSymbols?: Maybe<StockSymbolsResults>;
  getCurrentUser?: Maybe<UserDataResponse>;
  getHistoricalData?: Maybe<GetStockDataResponse>;
  getHistoricalFirstRow?: Maybe<StockSingleRowResults>;
  getMyPortfolio?: Maybe<GetPortfolioResults>;
};


export type QueryGetHistoricalDataArgs = {
  symbol: Scalars['String']['input'];
};

/** A stock object */
export type Stock = {
  __typename?: 'Stock';
  currentPrice?: Maybe<Scalars['Float']['output']>;
  id: Scalars['String']['output'];
  lastUpdated?: Maybe<Scalars['Date']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  purchasePrice?: Maybe<Scalars['Float']['output']>;
  quantity?: Maybe<Scalars['Float']['output']>;
  ticker?: Maybe<Scalars['String']['output']>;
};

/** This is the structure of a stock */
export type StockData = {
  __typename?: 'StockData';
  close?: Maybe<Scalars['Float']['output']>;
  date?: Maybe<Scalars['Date']['output']>;
  high?: Maybe<Scalars['Float']['output']>;
  id: Scalars['String']['output'];
  low?: Maybe<Scalars['Float']['output']>;
  open?: Maybe<Scalars['Float']['output']>;
  openInt?: Maybe<Scalars['Int']['output']>;
  stockId?: Maybe<Scalars['String']['output']>;
};

/** Results of a user object */
export type StockSingleRow = {
  __typename?: 'StockSingleRow';
  id: Scalars['String']['output'];
  name?: Maybe<Scalars['String']['output']>;
  stockData?: Maybe<Array<Maybe<StockData>>>;
  ticker?: Maybe<Scalars['String']['output']>;
};

/** Results of a all stock symbols with the most recent stock entry */
export type StockSingleRowResults = {
  __typename?: 'StockSingleRowResults';
  data?: Maybe<Array<Maybe<StockSingleRow>>>;
  error?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

/** Returns all stock ticker in the db */
export type StockSymbolsResults = {
  __typename?: 'StockSymbolsResults';
  data?: Maybe<Array<Maybe<StockTicker>>>;
  error?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

/** A stock ticker object */
export type StockTicker = {
  __typename?: 'StockTicker';
  id: Scalars['String']['output'];
  name?: Maybe<Scalars['String']['output']>;
  ticker?: Maybe<Scalars['String']['output']>;
};

/** A user type object */
export type User = {
  __typename?: 'User';
  createdAt?: Maybe<Scalars['Date']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  image?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

/** Results of a user object */
export type UserDataResponse = {
  __typename?: 'UserDataResponse';
  data?: Maybe<User>;
  error?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
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
  BigInt: ResolverTypeWrapper<Scalars['BigInt']['output']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  CreatePortfolio: CreatePortfolio;
  CreateResponse: ResolverTypeWrapper<CreateResponse>;
  CreateStockEntry: CreateStockEntry;
  Date: ResolverTypeWrapper<Scalars['Date']['output']>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  GetPortfolioResults: ResolverTypeWrapper<GetPortfolioResults>;
  GetStockDataResponse: ResolverTypeWrapper<GetStockDataResponse>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  JSON: ResolverTypeWrapper<Scalars['JSON']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  Portfolio: ResolverTypeWrapper<Portfolio>;
  Query: ResolverTypeWrapper<{}>;
  Stock: ResolverTypeWrapper<Stock>;
  StockData: ResolverTypeWrapper<StockData>;
  StockSingleRow: ResolverTypeWrapper<StockSingleRow>;
  StockSingleRowResults: ResolverTypeWrapper<StockSingleRowResults>;
  StockSymbolsResults: ResolverTypeWrapper<StockSymbolsResults>;
  StockTicker: ResolverTypeWrapper<StockTicker>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  User: ResolverTypeWrapper<User>;
  UserDataResponse: ResolverTypeWrapper<UserDataResponse>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  BigInt: Scalars['BigInt']['output'];
  Boolean: Scalars['Boolean']['output'];
  CreatePortfolio: CreatePortfolio;
  CreateResponse: CreateResponse;
  CreateStockEntry: CreateStockEntry;
  Date: Scalars['Date']['output'];
  Float: Scalars['Float']['output'];
  GetPortfolioResults: GetPortfolioResults;
  GetStockDataResponse: GetStockDataResponse;
  Int: Scalars['Int']['output'];
  JSON: Scalars['JSON']['output'];
  Mutation: {};
  Portfolio: Portfolio;
  Query: {};
  Stock: Stock;
  StockData: StockData;
  StockSingleRow: StockSingleRow;
  StockSingleRowResults: StockSingleRowResults;
  StockSymbolsResults: StockSymbolsResults;
  StockTicker: StockTicker;
  String: Scalars['String']['output'];
  User: User;
  UserDataResponse: UserDataResponse;
}>;

export interface BigIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigInt'], any> {
  name: 'BigInt';
}

export type CreateResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateResponse'] = ResolversParentTypes['CreateResponse']> = ResolversObject<{
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type GetPortfolioResultsResolvers<ContextType = any, ParentType extends ResolversParentTypes['GetPortfolioResults'] = ResolversParentTypes['GetPortfolioResults']> = ResolversObject<{
  data?: Resolver<Maybe<Array<Maybe<ResolversTypes['Portfolio']>>>, ParentType, ContextType>;
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

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  createPortfolio?: Resolver<Maybe<ResolversTypes['CreateResponse']>, ParentType, ContextType, Partial<MutationCreatePortfolioArgs>>;
  createStockEntry?: Resolver<Maybe<ResolversTypes['CreateResponse']>, ParentType, ContextType, Partial<MutationCreateStockEntryArgs>>;
}>;

export type PortfolioResolvers<ContextType = any, ParentType extends ResolversParentTypes['Portfolio'] = ResolversParentTypes['Portfolio']> = ResolversObject<{
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  stocks?: Resolver<Maybe<Array<Maybe<ResolversTypes['Stock']>>>, ParentType, ContextType>;
  totalInvestment?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  getAllSymbols?: Resolver<Maybe<ResolversTypes['StockSymbolsResults']>, ParentType, ContextType>;
  getCurrentUser?: Resolver<Maybe<ResolversTypes['UserDataResponse']>, ParentType, ContextType>;
  getHistoricalData?: Resolver<Maybe<ResolversTypes['GetStockDataResponse']>, ParentType, ContextType, RequireFields<QueryGetHistoricalDataArgs, 'symbol'>>;
  getHistoricalFirstRow?: Resolver<Maybe<ResolversTypes['StockSingleRowResults']>, ParentType, ContextType>;
  getMyPortfolio?: Resolver<Maybe<ResolversTypes['GetPortfolioResults']>, ParentType, ContextType>;
}>;

export type StockResolvers<ContextType = any, ParentType extends ResolversParentTypes['Stock'] = ResolversParentTypes['Stock']> = ResolversObject<{
  currentPrice?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lastUpdated?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  purchasePrice?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  quantity?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  ticker?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type StockDataResolvers<ContextType = any, ParentType extends ResolversParentTypes['StockData'] = ResolversParentTypes['StockData']> = ResolversObject<{
  close?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  date?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  high?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  low?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  open?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  openInt?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  stockId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type StockSingleRowResolvers<ContextType = any, ParentType extends ResolversParentTypes['StockSingleRow'] = ResolversParentTypes['StockSingleRow']> = ResolversObject<{
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  stockData?: Resolver<Maybe<Array<Maybe<ResolversTypes['StockData']>>>, ParentType, ContextType>;
  ticker?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type StockSingleRowResultsResolvers<ContextType = any, ParentType extends ResolversParentTypes['StockSingleRowResults'] = ResolversParentTypes['StockSingleRowResults']> = ResolversObject<{
  data?: Resolver<Maybe<Array<Maybe<ResolversTypes['StockSingleRow']>>>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type StockSymbolsResultsResolvers<ContextType = any, ParentType extends ResolversParentTypes['StockSymbolsResults'] = ResolversParentTypes['StockSymbolsResults']> = ResolversObject<{
  data?: Resolver<Maybe<Array<Maybe<ResolversTypes['StockTicker']>>>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type StockTickerResolvers<ContextType = any, ParentType extends ResolversParentTypes['StockTicker'] = ResolversParentTypes['StockTicker']> = ResolversObject<{
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  ticker?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserDataResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserDataResponse'] = ResolversParentTypes['UserDataResponse']> = ResolversObject<{
  data?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  BigInt?: GraphQLScalarType;
  CreateResponse?: CreateResponseResolvers<ContextType>;
  Date?: GraphQLScalarType;
  GetPortfolioResults?: GetPortfolioResultsResolvers<ContextType>;
  GetStockDataResponse?: GetStockDataResponseResolvers<ContextType>;
  JSON?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  Portfolio?: PortfolioResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Stock?: StockResolvers<ContextType>;
  StockData?: StockDataResolvers<ContextType>;
  StockSingleRow?: StockSingleRowResolvers<ContextType>;
  StockSingleRowResults?: StockSingleRowResultsResolvers<ContextType>;
  StockSymbolsResults?: StockSymbolsResultsResolvers<ContextType>;
  StockTicker?: StockTickerResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserDataResponse?: UserDataResponseResolvers<ContextType>;
}>;

