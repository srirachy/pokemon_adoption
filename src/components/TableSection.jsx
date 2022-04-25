import React from 'react';

const TableSection = ({children}) => {
    return (
        <>
        <section className="pokTable">
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