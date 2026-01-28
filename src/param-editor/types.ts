export type ParamType = 'string';

export interface ParamBase {
	id: number;
	name: string;
	type: ParamType
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
	model: Model
}