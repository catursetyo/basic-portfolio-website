import clsx from 'clsx';

export default function Container({ children, className }) {
    return (
        <div className={clsx("max-w-7xl mx-auto px-6 md:px-12 lg:px-24 w-full", className)}>
            {children}
        </div>
    );
}
