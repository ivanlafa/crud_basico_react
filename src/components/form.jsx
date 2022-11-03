import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';


function Formulario() {
    const [id, setId] = useState(1);
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [lista, setLista] = useState([]);
    const [error, setError] = useState('');
    const [fallo, setFallo] = useState(false);
    const [modoedit, setModoEdit] = useState(false);


    const handlerID = (e) => {
        setId(id + 1);
    }

    const handlerNombre = (e) => {
        setNombre(e.target.value);
    }

    const handlerApellido = (e) => {
        setApellido(e.target.value);
    }
    const agregar = (e) => {
        e.preventDefault();

        if (!nombre.trim()) {
            setFallo(true);
            setError('Escribe un nombre');
            return;
        }
        if (!apellido.trim()) {
            setFallo(true);
            setError('Escribe su apellido');
            return;
        }




        const usuario = {
            id: id,
            nombre: nombre,
            apellido: apellido,
        }

        setLista([...lista, usuario]);
        setNombre('');
        setApellido('');
        setFallo(false);
        setId(id + 1);
    }

    const borrar = (id) => {
        const filtrado = lista.filter(item => item.id !== id)
        setLista(filtrado);
    }

    const getDatos = (obj) => {
        setId(obj.id);
        setNombre(obj.nombre);
        setApellido(obj.apellido);
        setModoEdit(true);
    }

    const editar = (e) => {
        e.preventDefault();
        const editado = lista.map(item => item.id === id ? { nombre, apellido} : item);
        setLista(editado);
        setModoEdit(false);
        setNombre('');
        setApellido('');
    }

    return (
        <div className='row align-items-center'>
            <div className='col-md-6 tabla'>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            {/* <th className='text-center'>ID</th> */}
                            <th className='text-center'>Nombre</th>
                            <th className='text-center'>Apellido</th>
                            <th className='text-center'>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            lista.map(i => (
                                <tr key={i.id + 1}>
                                    {/* <td className='text-center'>{i.id}</td> */}
                                    <td className='text-center'>{i.nombre}</td>
                                    <td className='text-center'>{i.apellido}</td>
                                    <td className='text-center'>
                                        <button onClick={() => { getDatos(i) }} className='btn btn-warning text-light'>Editar</button>
                                        <button onClick={() => { borrar(i.id) }} className='btn btn-danger text-light mx-2'>Borrar</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </div>
            <div className='col-md-6'>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Control type='hidden' onChange={handlerID} value={id} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control type="text" onChange={handlerNombre} placeholder="Ingrese su nombre" value={nombre} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Apellido</Form.Label>
                        <Form.Control type="text" onChange={handlerApellido} placeholder="Ingrese su apellido" value={apellido} />
                    </Form.Group>
                    {
                        modoedit ? (
                            <Button onClick={(e) => { editar(e) }} variant="primary w-100" type="submit">
                                Editar
                            </Button>
                        ) : (
                            <Button onClick={agregar} variant="primary w-100" type="submit">
                                Agregar
                            </Button>
                        )
                    }

                </Form>
                <br></br>
                {
                    fallo ? (
                        <p className='bg-danger text-light w-100 text-center font-weight-bold text-uppercase py-1'>{error}</p>
                    ) : ''
                }
            </div>
        </div>
    )
}

export default Formulario;