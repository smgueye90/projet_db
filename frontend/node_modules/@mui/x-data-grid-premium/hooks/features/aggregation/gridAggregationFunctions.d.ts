import { GridAggregationFunction } from './gridAggregationInterfaces';
export declare const GRID_AGGREGATION_FUNCTIONS: {
    sum: GridAggregationFunction<unknown, number>;
    avg: GridAggregationFunction<unknown, number>;
    min: GridAggregationFunction<number | Date, number | Date>;
    max: GridAggregationFunction<number | Date, number | Date>;
    size: GridAggregationFunction<unknown, number>;
};
