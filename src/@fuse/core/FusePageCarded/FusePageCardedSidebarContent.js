import React from 'react';
import { useSelector } from 'react-redux';

import FuseScrollbars from '@fuse/core/FuseScrollbars';
import { ThemeProvider } from '@material-ui/core/styles';
import clsx from 'clsx';

function FusePageCardedSidebarContent(props) {
	const mainThemeDark = useSelector(({ fuse }) => fuse.settings.mainThemeDark);

	const { classes } = props;

	return (
		<>
			{props.header && (
				<ThemeProvider theme={mainThemeDark}>
					<div className={clsx(classes.sidebarHeader, props.variant)}>{props.header}</div>
				</ThemeProvider>
			)}

			{props.content && (
				<FuseScrollbars className={classes.sidebarContent} enable={props.innerScroll}>
					{props.content}
				</FuseScrollbars>
			)}
		</>
	);
}

export default FusePageCardedSidebarContent;
