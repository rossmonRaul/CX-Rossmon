import React, { Component } from 'react';

export class Home extends Component {
    static displayName = Home.name;
    componentDidMount() {
        window.history.replaceState(null, "Home", "/")
    }
    render() {
        return (

            <div className="inicio">
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                <p className="head1">Experiencia de cliente para tu negocio</p>
                <p className="head2">
                    Brindar una excelente experiencia al cliente es muy importante para cualquier empresa.
                    Mientras mejor experiencia reciban los clientes, se tendran rese&ntilde;as mas positivas,
                    lo cual al mismo tiempo reduce la brecha de las quejas y mantiene a los clientes.</p>
            </div>
        );
    }
}
