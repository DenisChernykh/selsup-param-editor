import type { Param, StringParam } from './types';

export type ParamValueEditorProps<TParam extends Param = Param> = {
  param: TParam;
  value: string;
  onValueChange: (nextValue: string) => void;
  inputId: string;
};

export const StringParamInput: React.FC<ParamValueEditorProps<StringParam>> = ({
  value,
  onValueChange,
  inputId,
}) => {
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
};

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

export const ParamField: React.FC<ParamFieldProps> = ({
  param,
  value,
  onValueChange,
}) => {
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
};
