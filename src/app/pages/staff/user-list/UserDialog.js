import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '@fuse/hooks';
import clsx from 'clsx';
import FuseUtils from '@fuse/utils/FuseUtils';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { XCircle } from 'react-feather';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';
import CssTextField from 'app/fuse-layouts/shared-components/CssTextField';
import * as Actions from './store/actions';

const defaultFormState = {
	id: '',
	name: '',
	lastName: '',
	avatar: 'assets/images/avatars/profile.jpg',
	nickname: '',
	company: '',
	jobTitle: '',
	email: '',
	phone: '',
	address: '',
	birthday: '',
	notes: ''
};

function PaperComponent(props) {
	return (
		<Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
			<Paper {...props} />
		</Draggable>
	);
}

const useStyles = makeStyles(theme => ({
	avatarWrapper: {
		boxShadow: `0 0 0 12px ${theme.palette.background.default}`
	}
}));

function UserDialog(props) {
	const classes = useStyles();
	const dispatch = useDispatch();
	const contactDialog = useSelector(({ contactsApp }) => contactsApp.contacts.contactDialog);

	const { form, handleChange, setForm } = useForm(defaultFormState);

	const initDialog = useCallback(() => {
		/**
		 * Dialog type: 'edit'
		 */
		if (contactDialog.type === 'edit' && contactDialog.data) {
			setForm({ ...contactDialog.data });
		}

		/**
		 * Dialog type: 'new'
		 */
		if (contactDialog.type === 'new') {
			setForm({
				...defaultFormState,
				...contactDialog.data,
				id: FuseUtils.generateGUID()
			});
		}
	}, [contactDialog.data, contactDialog.type, setForm]);

	useEffect(() => {
		/**
		 * After Dialog Open
		 */
		if (contactDialog.props.open) {
			initDialog();
		}
	}, [contactDialog.props.open, initDialog]);

	function closeComposeDialog() {
		return contactDialog.type === 'edit'
			? dispatch(Actions.closeEditContactDialog())
			: dispatch(Actions.closeNewContactDialog());
	}

	function canBeSubmitted() {
		return form.name.length > 0;
	}

	function handleSubmit(event) {
		event.preventDefault();

		if (contactDialog.type === 'new') {
			dispatch(Actions.addContact(form));
		} else {
			dispatch(Actions.updateContact(form));
		}
		closeComposeDialog();
	}

	function handleRemove() {
		dispatch(Actions.removeContact(form.id));
		closeComposeDialog();
	}

	return (
		<Dialog
			classes={{
				paper: 'm-24 rounded-8 bg-bgDefault'
			}}
			{...contactDialog.props}
			onClose={closeComposeDialog}
			PaperComponent={PaperComponent}
			fullWidth
			maxWidth="md"
		>
			<AppBar position="static" elevation={1} id="draggable-dialog-title" className="mb-48 rounded-8">
				<Toolbar className="flex w-full justify-between">
					<Typography variant="subtitle1" color="inherit">
						{contactDialog.type === 'new' ? 'New Contact' : '編輯用戶'}
					</Typography>

					<IconButton
						key="close"
						aria-label="關閉編輯頁面"
						className="p-12 mr-0 sm:mr-4"
						color="inherit"
						size="small"
						// TODO fix close bug
						onClick={closeComposeDialog}
					>
						<XCircle size={18} />
					</IconButton>
				</Toolbar>
				<div className="flex flex-col items-center justify-center">
					{/* <Avatar className="w-96 h-96" alt="contact avatar" src={form.avatar} /> */}
					{/* <Typography variant="h6" color="inherit" className="pt-8">
							{form.name}
						</Typography> */}
					{contactDialog.type === 'edit' && (
						<Avatar
							className={clsx(classes.avatarWrapper, 'w-96 h-96 -mb-36')}
							alt="contact avatar"
							src={form.avatar}
						/>
					)}
				</div>
			</AppBar>
			<form noValidate onSubmit={handleSubmit} className="flex flex-col md:overflow-hidden">
				<DialogContent classes={{ root: 'p-24' }}>
					<div className="flex">
						<div className="min-w-48 pt-20">
							<Icon color="action">account_circle</Icon>
						</div>

						<CssTextField
							className="mb-24"
							label="Name"
							autoFocus
							id="name"
							name="name"
							value={form.name}
							onChange={handleChange}
							variant="outlined"
							required
							fullWidth
						/>
					</div>

					<div className="flex">
						<div className="min-w-48 pt-20" />
						<CssTextField
							className="mb-24"
							label="Last name"
							id="lastName"
							name="lastName"
							value={form.lastName}
							onChange={handleChange}
							variant="outlined"
							fullWidth
						/>
					</div>

					<div className="flex">
						<div className="min-w-48 pt-20">
							<Icon color="action">star</Icon>
						</div>
						<CssTextField
							className="mb-24"
							label="Nickname"
							id="nickname"
							name="nickname"
							value={form.nickname}
							onChange={handleChange}
							variant="outlined"
							fullWidth
						/>
					</div>

					<div className="flex">
						<div className="min-w-48 pt-20">
							<Icon color="action">phone</Icon>
						</div>
						<CssTextField
							className="mb-24"
							label="Phone"
							id="phone"
							name="phone"
							value={form.phone}
							onChange={handleChange}
							variant="outlined"
							fullWidth
						/>
					</div>

					<div className="flex">
						<div className="min-w-48 pt-20">
							<Icon color="action">email</Icon>
						</div>
						<CssTextField
							className="mb-24"
							label="Email"
							id="email"
							name="email"
							value={form.email}
							onChange={handleChange}
							variant="outlined"
							fullWidth
						/>
					</div>

					<div className="flex">
						<div className="min-w-48 pt-20">
							<Icon color="action">domain</Icon>
						</div>
						<CssTextField
							className="mb-24"
							label="Company"
							id="company"
							name="company"
							value={form.company}
							onChange={handleChange}
							variant="outlined"
							fullWidth
						/>
					</div>

					<div className="flex">
						<div className="min-w-48 pt-20">
							<Icon color="action">work</Icon>
						</div>
						<CssTextField
							className="mb-24"
							label="Job title"
							id="jobTitle"
							name="jobTitle"
							value={form.jobTitle}
							onChange={handleChange}
							variant="outlined"
							fullWidth
						/>
					</div>

					<div className="flex">
						<div className="min-w-48 pt-20">
							<Icon color="action">cake</Icon>
						</div>
						<CssTextField
							className="mb-24"
							id="birthday"
							label="Birthday"
							type="date"
							value={form.birthday}
							onChange={handleChange}
							InputLabelProps={{
								shrink: true
							}}
							variant="outlined"
							fullWidth
						/>
					</div>

					<div className="flex">
						<div className="min-w-48 pt-20">
							<Icon color="action">home</Icon>
						</div>
						<CssTextField
							className="mb-24"
							label="Address"
							id="address"
							name="address"
							value={form.address}
							onChange={handleChange}
							variant="outlined"
							fullWidth
						/>
					</div>

					<div className="flex">
						<div className="min-w-48 pt-20">
							<Icon color="action">note</Icon>
						</div>
						<CssTextField
							className="mb-24"
							label="Notes"
							id="notes"
							name="notes"
							value={form.notes}
							onChange={handleChange}
							variant="outlined"
							multiline
							rows={5}
							fullWidth
						/>
					</div>
				</DialogContent>

				{contactDialog.type === 'new' ? (
					<DialogActions className="justify-between p-8">
						<div className="px-16">
							<Button
								variant="contained"
								color="primary"
								onClick={handleSubmit}
								type="submit"
								disabled={!canBeSubmitted()}
							>
								Add
							</Button>
						</div>
					</DialogActions>
				) : (
					<DialogActions className="justify-between p-8">
						<div className="px-16">
							<Button
								variant="contained"
								color="primary"
								type="submit"
								onClick={handleSubmit}
								disabled={!canBeSubmitted()}
							>
								Save
							</Button>
						</div>
						<IconButton onClick={handleRemove}>
							<Icon>delete</Icon>
						</IconButton>
					</DialogActions>
				)}
			</form>
		</Dialog>
	);
}

export default UserDialog;