import React, { useState, useEffect } from 'react';

// Styles
import './App.css';


function App() {

	const [cashRegisters, setCashRegisters] = useState([[2, 5, 4], [3, 9], [5], [8, 4], [6]]);

	const [itemInput, setItemInput] = useState(0);


	const handleItemInput = (event) => {
		setItemInput(event.target.value);
	}


	const addItem = (minIndex, itemAmount) => {
		cashRegisters[minIndex].push(itemAmount);
		console.log(cashRegisters[minIndex]);
	}


	const handleCheckoutClick = () => {

		if(itemInput === 0 || itemInput.length === 0 || Number(itemInput) > 9) {
			alert("Please enter a valid amount between 1-9");
			return;
		}

		let totalsList = [];
		for(let cashRegister of cashRegisters) {
			const registerTotal = cashRegister.reduce((a, b) => a + b, 0);
			totalsList.push(registerTotal);
		}
		const minIndex = totalsList.indexOf(Math.min(...totalsList));

		addItem(minIndex, Number(itemInput));

		setCashRegisters(prev => [...prev]);
	}

	
	useEffect(() => {
		const interval = setInterval(() => {
			setCashRegisters(prev => prev.map(line => [line[0] - 1, ...line.slice(1)].filter(value => value > 0)))
		}, 3000)

		return () => {
			clearInterval(interval);
		}
	}, []);

	


	
	return (
		<div className="App">
			<div className='controls'>
				<input value={itemInput} onChange={handleItemInput} type="number" className='item-input' />
				<button onClick={handleCheckoutClick} className='checkout-button'>Checkout</button>
			</div>
			
			<div className='main-container'>
				{cashRegisters.map((register, index) => (
					<div key={index} className='register'>
						<p>Register<br />Number: {index}</p>

						<div className='customer-container'>
							{register.map((customer, index) => (
								<div key={index} className='customer'>
									<p>{customer}</p>
								</div>
							))}
						</div>
						
					</div>
				))}
			</div>

		</div>
	);
}

export default App;
