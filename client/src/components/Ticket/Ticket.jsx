import React, {Component} from 'react';

import '../../styles/index.sass';

class Ticket extends React.Component {
	constructor(props) {
		super(props);
	}

	convertDate(date) {
		const daysOfWeek = ['Сб', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
		const monthNames = ["янв", "Фев", "март", "апр", "май", "июнь",
			"июль", "авг", "сент", "окт", "нояб", "дек"
		];
		const full_date = date;

		function full_date_dd() {
			if (full_date.charAt(1) !== '.') {
				return full_date;
			}
			return '0' + full_date;
		}

		const dd = full_date_dd().slice(0, 2);
		const mm = full_date_dd().slice(3, 5);
		const yy = full_date_dd().slice(6, 8);
		const convertedDate = new Date('20' + yy + '-' + mm + '-' + dd);
		const getDayName = daysOfWeek[convertedDate.getDay()];
		const getMonthName = monthNames[convertedDate.getMonth()];
		return dd + ' ' + getMonthName + ' 20' + yy + ', ' + getDayName;
	}

	convertTime(time) {
		if (time.charAt(1) === ':') {
			return '0' + time
		}
		return time
	}

	convertPrice(price) {
		const pr = ' ' + price;

		const pr_end = pr.slice(-3);

		const pr_start = pr.slice(0, -3);
		return pr_start + ' ' + pr_end + ' Р'
	}

	render() {
		const tickets = this.props.ticketsFiltered;
		const number = this.props.number;
		return (
			<div className="ticket clearfix">
				<div className="ticket__left">
					<div className="ticket__logo">
						<img src="../../img/logo-ticket.png" alt={tickets[number].carrier}
							 title={tickets[number].carrier}/>
					</div>
					<a href="javascript:void(0);" className="ticket__btn">
						Купить <br/> за {this.convertPrice(tickets[number].price)}
					</a>
				</div>
				<div className="ticket__right">
					<div className="ticket__from">
						<span className="ticket__time">{this.convertTime(tickets[number].departure_time)} </span>
						<span className="ticket__place">{tickets[number].origin}, {tickets[number].origin_name} </span>
						<time className="ticket__date">{this.convertDate(tickets[number].departure_date)}</time>
					</div>
					<div className="ticket__transfer">
						{tickets[number].stops === 0 ? <span className='ticket__transfer-title'>&nbsp;</span> :
							tickets[number].stops === 1 ? <span className='ticket__transfer-title'>{tickets[number].stops} пересадка</span> :
								<span className='ticket__transfer-title'>{tickets[number].stops} пересадки</span>
						}
					</div>
					<div className="ticket__to">
						<span className="ticket__time">{this.convertTime(tickets[number].arrival_time)} </span>
						<span className="ticket__place">{tickets[number].destination_name}, {tickets[number].destination} </span>
						<time className="ticket__date">{this.convertDate(tickets[number].arrival_date)}</time>
					</div>
				</div>
			</div>
		)
	}
}

export default Ticket;