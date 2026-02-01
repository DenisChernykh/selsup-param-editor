import { useRef } from 'react';
import type { Param } from './param-editor/types';
import { ParamEditor } from './param-editor/ParamEditor';

const demoParams: Param[] = [
  { id: 1, name: 'Назначание', type: 'string' },
  { id: 2, name: 'Длина', type: 'string' },
];

const demoModel = {
  paramValues: [
    { paramId: 1, value: 'повседневное' },
    { paramId: 2, value: 'макси' },
  ],
  colors: [],
};

export function App() {
  const editorRef = useRef<ParamEditor>(null);
  const handlePrintModel = () => {
    const model = editorRef.current?.getModel();
    console.log('getModel()', model);
    alert(JSON.stringify(model, null, 2));
  };

  return (
    <div style={{ padding: 24, fontFamily: 'system-ui, sans-serif' }}>
      <h1 style={{ margin: 0, marginBottom: 16 }}>Param Editor demo</h1>
      <ParamEditor ref={editorRef} params={demoParams} model={demoModel} />
      <button
        style={{ marginTop: 16, padding: '8px 12px' }}
        type="button"
        onClick={handlePrintModel}
      >
        getModel()
      </button>
    </div>
  );
}
