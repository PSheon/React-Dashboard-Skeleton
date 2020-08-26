import React from 'react';

import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import { withFormsy } from 'formsy-react';

import _ from '@lodash';

function RadioGroupFormsy(props) {
	const importedProps = _.pick(props, ['children', 'name', 'onBlur', 'onChange', 'onKeyDown', 'variant']);

	// An error message is returned only if the component is invalid
	const { errorMessage, value } = props;

	function changeValue(event, val) {
		props.setValue(val);
		if (props.onChange) {
			props.onChange(event);
		}
	}

	return (
		<FormControl
			error={Boolean((!props.isPristine && props.showRequired) || errorMessage)}
			className={props.className}
		>
			<FormControl component="fieldset" required={props.required} error={Boolean(errorMessage)}>
				{props.label && <FormLabel component="legend">{props.label}</FormLabel>}
				<RadioGroup {...importedProps} value={value || null} onChange={changeValue} />
				{Boolean(errorMessage) && <FormHelperText>{errorMessage}</FormHelperText>}
			</FormControl>
		</FormControl>
	);
}

export default React.memo(withFormsy(RadioGroupFormsy));
