import React from 'react';

export type ParamType = 'string';

export interface ParamBase {
  id: number;
  name: string;
  type: ParamType;
}

export interface StringParam extends ParamBase {
  type: 'string';
}

export type Param = StringParam;

export interface ParamValue {
  paramId: number;
  value: string;
}

export interface Color {
  id: number;
  name: string;
}

export interface Model {
  paramValues: ParamValue[];
  colors: Color[];
}

export interface ParamEditorProps {
  params: Param[];
  model: Model;
}
export type ParamEditorState = {
  valuesByParamId: ValuesByParamId;
};

export type ValuesByParamId = Record<number, string>;

function buildModelValuesMap(model: Model): Map<number, string> {
  const modelValuesMap = new Map<number, string>();
  for (const paramValue of model.paramValues) {
    modelValuesMap.set(paramValue.paramId, paramValue.value);
  }
  return modelValuesMap;
}

function buildInitialValuesByParamId(
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

function applyParamValueChange(
  previousValues: ValuesByParamId,
  paramId: number,
  nextValue: string,
): ValuesByParamId {
  return {
    ...previousValues,
    [paramId]: nextValue,
  };
}

function buildParamValues(
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

function buildNextModel(
  params: Param[],
  previousModel: Model,
  valuesByParamId: ValuesByParamId,
): Model {
  return {
    ...previousModel,
    paramValues: buildParamValues(params, valuesByParamId),
  };
}

export type ParamValueEditorProps<TParam extends Param = Param> = {
  param: TParam;
  value: string;
  onValueChange: (nextValue: string) => void;
  inputId: string;
};

export function StringParamInput({
  value,
  onValueChange,
  inputId,
}: ParamValueEditorProps<StringParam>) {
  return (
    <input
      id={inputId}
      type="text"
      value={value}
      onChange={(event) => onValueChange(event.target.value)}
      style={{
        width: 320,
        padding: '8px 10px',
        border: '1px solid #bbb',
        borderRadius: 4,
        fontSize: 16,
      }}
    />
  );
}

function buildParamInputId(paramId: number): string {
  return `param-${paramId}`;
}

function renderParamEditor(
  param: Param,
  value: string,
  onValueChange: (nextValue: string) => void,
  inputId: string,
): React.ReactNode {
  switch (param.type) {
    case 'string':
      return (
        <StringParamInput
          param={param}
          value={value}
          onValueChange={onValueChange}
          inputId={inputId}
        />
      );

    default: {
      throw new Error(`Unsupported param type: ${String(param.type)}`);
    }
  }
}

export type ParamFieldProps = {
  param: Param;
  value: string;
  onValueChange: (nextValue: string) => void;
};

export function ParamField({ param, value, onValueChange }: ParamFieldProps) {
  const inputId = buildParamInputId(param.id);
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '180px 1fr',
        alignItems: 'center',
        gap: 16,
        padding: '10px 0',
      }}
    >
      <label htmlFor={inputId} style={{ fontSize: 20, fontWeight: 600 }}>
        {param.name}
      </label>
      {renderParamEditor(param, value, onValueChange, inputId)}
    </div>
  );
}

export class ParamEditor extends React.Component<
  ParamEditorProps,
  ParamEditorState
> {
  public state: ParamEditorState = {
    valuesByParamId: buildInitialValuesByParamId(
      this.props.params,
      this.props.model,
    ),
  };

  public componentDidUpdate(prevProps: ParamEditorProps): void {
    const paramsChanged = prevProps.params !== this.props.params;
    const modelChanged = prevProps.model !== this.props.model;
    if (!paramsChanged && !modelChanged) {
      return;
    }
    this.setState({
      valuesByParamId: buildInitialValuesByParamId(
        this.props.params,
        this.props.model,
      ),
    });
  }

  private handleParamValueChange = (
    paramId: number,
    nextValue: string,
  ): void => {
    this.setState((previousState) => {
      return {
        valuesByParamId: applyParamValueChange(
          previousState.valuesByParamId,
          paramId,
          nextValue,
        ),
      };
    });
  };

  public getModel(): ReturnType<typeof buildNextModel> {
    return buildNextModel(
      this.props.params,
      this.props.model,
      this.state.valuesByParamId,
    );
  }
  public render(): React.ReactNode {
    const { params } = this.props;
    const { valuesByParamId } = this.state;

    return (
      <div role="form" aria-label="Param editor">
        {params.map((param) => (
          <ParamField
            key={param.id}
            param={param}
            value={valuesByParamId[param.id] ?? ''}
            onValueChange={(nextValue) =>
              this.handleParamValueChange(param.id, nextValue)
            }
          />
        ))}
      </div>
    );
  }
}
