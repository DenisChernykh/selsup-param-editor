import React from 'react';
import {
  applyParamValueChange,
  buildInitialValuesByParamId,
  buildNextModel,
  type ValuesByParamId,
} from './core';
import type { ParamEditorProps } from './types';
import { ParamField } from './ui';

export type ParamEditorState = {
  valuesByParamId: ValuesByParamId;
};

export class ParamEditoor extends React.Component<
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
