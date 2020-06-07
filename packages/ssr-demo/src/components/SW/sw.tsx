import React, { useState, useEffect, useRef } from 'react';
import {useResolvedPromise, ResolvedPromiseStatus } from '@wix/react-resolved-promises';
import axois from 'axios';

const getCharacter = (id: number) => axois.get(`https://swapi.dev/api/people/${id}/`).then(({data}) => data);

export const SW = () => {
    const [id, setId] = useState(1);
    const { status, data, rerun } = useResolvedPromise('/people/1/', () => getCharacter(id));

    useEffectExceptOnMount(() => {
        rerun(() => getCharacter(id))
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


const useEffectExceptOnMount = (effect: () => void, dependencies: any[]) => {
    const mounted = useRef(false);
    useEffect(() => {
      if (mounted.current) {
        effect();
      } else {
        mounted.current = true;
      }
    }, dependencies);
  };