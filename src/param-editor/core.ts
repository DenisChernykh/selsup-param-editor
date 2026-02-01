import type { Model, Param, ParamValue } from './types';

export type ValuesByParamId = Record<number, string>;

function buildModelValuesMap(model: Model): Map<number, string> {
  const modelValuesMap = new Map<number, string>();
  for (const paramValue of model.paramValues) {
    modelValuesMap.set(paramValue.paramId, paramValue.value);
  }
  return modelValuesMap;
}

export function buildInitialValuesByParamId(
  params: Param[],
  model: Model,
): ValuesByParamId {
  const modelValuesMap = buildModelValuesMap(model);

  const valuesByParamId: ValuesByParamId = {};
  for (const param of params) {
    valuesByParamId[param.id] = modelValuesMap.get(param.id) ?? '';
  }
  return valuesByParamId;
}

export function applyParamValueChange(
  previousValues: ValuesByParamId,
  paramId: number,
  nextValue: string,
): ValuesByParamId {
  return {
    ...previousValues,
    [paramId]: nextValue,
  };
}

export function buildParamValues(
  params: Param[],
  valuesByParamId: ValuesByParamId,
): ParamValue[] {
  return params.map((param): ParamValue => {
    return {
      paramId: param.id,
      value: valuesByParamId[param.id] ?? '',
    };
  });
}

export function buildNextModel(
  params: Param[],
  previousModel: Model,
  valuesByParamId: ValuesByParamId,
): Model {
  return {
    ...previousModel,
    paramValues: buildParamValues(params, valuesByParamId),
  };
}
