import React, { useState, useEffect } from 'react';
import {useResolvedPromise, ResolvedPromiseStatus } from '@wix/react-resolved-promises';
import axois from 'axios';

const getChar = (id: number) => axois.get(`https://swapi.dev/api/people/${id}/`).then(({data}) => data);

export const SW = () => {
    const [id, setId] = useState(1);
    const { status, data, rerun } = useResolvedPromise('/people/1/', () => getChar(id));

    useEffect(() => {
        rerun(() => getChar(id))
    }, [id]);

    if (status === ResolvedPromiseStatus.PENDING || status === ResolvedPromiseStatus.PENDING_RERUN) {
        return <div>LOADING...</div>;
    }
    return (
        <div>
            <div>{data.name}</div>
            <button onClick={() => {setId(id + 1)}}>next</button>
        </div>
    );
}