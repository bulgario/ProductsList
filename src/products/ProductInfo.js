import React, { useState, useEffect, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

import SaveButton from './SaveButton'

function rand() {
	return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
	const top = 50 + rand();
	const left = 50 + rand();

	return {
		top: `${top}%`,
		left: `${left}%`,
		transform: `translate(-${top}%, -${left}%)`,
	};
}

const useStyles = makeStyles(theme => ({
	paper: {
		position: 'absolute',
		width: 600,
		backgroundColor: theme.palette.background.paper,
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
}));

export default function SimpleModal({data, ...props}) {
	useEffect(() => {
		if (data && data.skus && data.skus.edges) {
			handleProducts(data.skus.edges)
		}
	})
	const classes = useStyles()
	const [modalStyle] = React.useState(getModalStyle)
	const [products, handleProducts] = useState([]);

	const handleName = (e) => {
		const arr = [...products]
		arr[e.target.id].node = { ...products[e.target.id].node, name: e.target.value }
		handleProducts(arr)
	}

	const handlePromotionalPrice = (e) => {
		const arr = [...products]
		arr[e.target.id].node = { ...products[e.target.id].node, promotionalPrice: e.target.value }
		handleProducts(arr)
	}

	const handleSalePrice = (e) => {
		const arr = [...products]
		arr[e.target.id].node = { ...products[e.target.id].node, salePrice: e.target.value }
		handleProducts(arr)
	}

	return (
		<div>
			<Modal
				aria-labelledby="simple-modal-title"
				aria-describedby="simple-modal-description"
				open={props.productInfo}
				onClose={props.handleClose}
			>
				<div style={modalStyle} className={classes.paper}>
					<Fragment>
						<table>
							<thead>
								<tr>
									<th>Imagem</th>
									<th>Name</th>
									<th>Promotional Price</th>
									<th>Sale Price</th>
									<th>Quantidade</th>
								</tr>
							</thead>
							<tbody>
								{products.map((product, index) => {
									if (product.node.id === props.idProduct) {
										return (
											<tr key={index} >
												<td>
													<img src={product.node.images[0].url}></img>
												</td>
												<td>
													<input type="text"
														name="productName"
														value={product.node.name}
														id={index}
														onChange={handleName}
													>
													</input>
												</td>
												<td>
													<input
														type="text"
														name="promotionalPrice"
														value={product.node.promotionalPrice}
														id={index}
														onChange={handlePromotionalPrice}
													>
													</input>
												</td>
												<td>
													<input
														type="number"
														name="productName"
														value={product.node.salePrice}
														id={index}
														onChange={handleSalePrice}
													>
													</input>
												</td>
												<td>
													<SaveButton productName={product} />
													<button className="button muted-button" onClick={props.handleClose}>Cancelar</button>
												</td>
											</tr>
										)
									}
								})
								}
							</tbody>
							<SimpleModal />
						</table>
					</Fragment>
				</div>
			</Modal>
		</div>
	);
}
