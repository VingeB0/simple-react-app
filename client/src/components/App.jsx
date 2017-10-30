import React, {Component} from 'react';
import axios from 'axios';

import '../styles/index.sass';

import Logo from './Logo/Logo.jsx';
import Filter from './Filter/Filter.jsx';
import Ticket from './Ticket/Ticket.jsx';

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			tickets: [], // массив в который пугшутся с жсон файла данные и из него же делается выборка в filteedtickets
			ticketsFiltered: [], // массив тикетов которые рендерятся и копируются из массива tickets
			filterInputs: [ // массив чекбоксов которые рендерятся
				{
					checked: false,
					text: 'Все',
				},
				{
					checked: true,
					text: 'Без пересадок',
				},
				{
					checked: false,
					text: '1 пересадка',
				},
				{
					checked: false,
					text: '2 пересадки',
				},
				{
					checked: false,
					text: '3 пересадки',
				}
			]
		}
	}

	componentDidMount() {
		axios.get('./tickets.json')
			.then(function (response) {
				this.setState({
					tickets: response.data.tickets.sort(function (a, b) {
						return a.price - b.price;
					})
				});
				this.setState({
					ticketsFiltered: response.data.tickets.filter(
						(item) => {
							return item.stops === 0;
						}
					)
				})
			}.bind(this))
			.catch(function (error) {
				console.log(error);
			});
	}

	onChecked = (number) => {
		this.setState((prevState) => {
			let newFilterInputs = prevState.filterInputs.slice();
			for (let i = 0, l = this.state.filterInputs.length; i < l; i++) {
				if (number === 0) {
					newFilterInputs[i].checked = true;
				} else {
					newFilterInputs[number].checked = !newFilterInputs[number].checked;
					newFilterInputs[0].checked = false;
				}
			}
			return {
				filterInputs: newFilterInputs
			};
		})
	};

	onCheckedFilter = (number) => {
		switch (number) {
			case 0:
				var arr1 = this.state.ticketsFiltered.slice();
				if (this.state.filterInputs[0].checked === false) {
					arr1.length = 0;
					for (let i = 0, l = this.state.tickets.length; i < l; i++) {
						arr1.push(this.state.tickets[i]);
						this.setState({ticketsFiltered: arr1})
					}
				} else {
					this.setState((prevState) => {
						//all checkboxes get false
						let newFilterInputs = prevState.filterInputs.slice();
						for (let i = 0, l = this.state.filterInputs.length; i < l; i++) {
							newFilterInputs[i].checked = false;
						}
						//ticketsFiltered rendering array leng is zero
						let newTicketsFiltered = prevState.ticketsFiltered.slice();
						newTicketsFiltered.length = 0;
						return {
							ticketsFiltered: newTicketsFiltered
						};
					});
				}
				break;
			case 1:
				this.insideOnCheckedFilter(number);
				break;
			case 2:
				this.insideOnCheckedFilter(number);
				break;
			case 3:
				this.insideOnCheckedFilter(number);
				break;
			case 4:
				this.insideOnCheckedFilter(number);
				break;
		}
	};

	insideOnCheckedFilter(number) {
		var newArr = this.state.ticketsFiltered.slice();
		if (this.state.filterInputs[number].checked === false) {
			for (let i = 0, l = this.state.tickets.length; i < l; i++) {
				if (this.state.tickets[i].stops === number - 1) {
					newArr.push(this.state.tickets[i]);
					this.setState({
						ticketsFiltered: newArr.sort(function (a, b) {
							return a.price - b.price;
						})
					})
				}
			}
		} else {
			this.setState({
				ticketsFiltered: this.state.ticketsFiltered.filter(
					(item) => {
						return item.stops !== number - 1;
					}
				)
			});
		}
	}

	btnFilter = (number) => {
		switch (number) {
			case 1:
				this.onClickBtnFilter(number);
				break;
			case 2:
				this.onClickBtnFilter(number);
				break;
			case 3:
				this.onClickBtnFilter(number);
				break;
			case 4:
				this.onClickBtnFilter(number);
				break;
		}
	};

	onClickBtnFilter(number) {
		this.setState((prevState) => {
			let newFilterInputs = prevState.filterInputs.slice();
			for (let i = 0, l = this.state.filterInputs.length; i < l; i++) {
				newFilterInputs[i].checked = false;
			}
			newFilterInputs[number].checked = true;
			return {
				filterInputs: newFilterInputs
			};
		});

		var newArr = this.state.ticketsFiltered.slice();
		newArr.length = 0;
		for (let i = 0, l = this.state.tickets.length; i < l; i++) {
			if (this.state.tickets[i].stops === number - 1) {
				newArr.push(this.state.tickets[i]);
				this.setState({
					ticketsFiltered: newArr.sort(function (a, b) {
						return a.price - b.price;
					})
				})
			}
		}
	}

	titleNoTickets() {
		if (this.state.ticketsFiltered.length === 0)
			return <p className="title-no-tickets">Мы нашли {this.state.tickets.length} билет(ов), но ни один не соответствует заданным фильтрам. Воспользуйтесь фильтром для того чтобы найти необходимые для вас билеты.</p>
	}

	render() {
		return (
			<div>
				<header>
					<Logo/>
				</header>
				<main>
					<div className="container clearfix">
						<aside className="wrap-filter">
							<h2>Количество пересадок</h2>
							<div className="filter">
								{this.state.filterInputs.map((item, index) =>
									<Filter filterInputs={this.state.filterInputs} number={index} key={index}
											onCheckedFilter={this.onCheckedFilter} onChecked={this.onChecked}
											btnFilter={this.btnFilter}/>
								)}
							</div>
						</aside>
						<div className="wrap-tickets">
							{this.titleNoTickets()}
							{this.state.ticketsFiltered.map((item, index) =>
								<Ticket ticketsFiltered={this.state.ticketsFiltered} number={index} key={index}/>
							)}
						</div>
					</div>
				</main>
			</div>
		)
	}
}

export default App;