import React from 'react';

const TableSection = ({children, className}) => {
    return (
        <>
        <section className={className}>
            <table>
                <tbody>
                    {children}
                </tbody>
            </table>
        </section>
        </>
    );
}

export default TableSection;