import React from 'react';
import { Gift } from 'react-feather';
import { Link } from 'react-router-dom';

import FuseAnimate from '@fuse/core/FuseAnimate';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from 'app/fuse-layouts/shared-components/Breadcrumbs';

import PaymentHistory from './cards/PaymentHistory';

function PaymentPage() {
	return (
		<div className="w-full">
			<FuseAnimate animation="transition.slideUpIn" delay={200}>
				<Breadcrumbs breadCrumbTitle="付款紀錄" breadCrumbs={[{ title: '付款紀錄', isActive: true }]} />
			</FuseAnimate>

			<PaymentHistory />

			<FuseAnimate animation="transition.slideUpIn" delay={200}>
				<Link to="/pricing" role="button">
					<div className="flex justify-center mx-16 sm:mx-24 pt-24">
						<div className="w-full p-24 flex flex-col justify-center items-center bg-bgPaper rounded-8">
							<Typography className="h1 font-semibold flex items-center" color="textPrimary">
								<Gift className="inline mr-12" size={24} /> 查看方案
							</Typography>
						</div>
					</div>
				</Link>
			</FuseAnimate>
		</div>
	);
}

export default PaymentPage;
