import { useEffect, useRef } from "react";

const usePrevious = (val) => {
    const ref = useRef();

    useEffect(() => {
        ref.current = val; //update ref.current to current val from previous render cycle
    }, [val]);

    return ref.current;
}

export default usePrevious;