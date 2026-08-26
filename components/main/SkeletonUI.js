function CartItemSkeleton() {
    return (
        <div className='flex items-start justify-between border-b border-muted p-3 animate-pulse'>
            <div className='flex items-start gap-5'>
                <div className='w-20 h-20 rounded-xl bg-muted/40' />
                <div className='flex flex-col items-start gap-2 pt-1'>
                    <div className='h-4 w-32 rounded bg-muted/40' />
                    <div className='flex items-center gap-2'>
                        <div className='h-3 w-10 rounded bg-muted/30' />
                        <span className='w-px h-5 bg-muted/30'></span>
                        <div className='h-3 w-14 rounded bg-muted/30' />
                    </div>
                </div>
            </div>
            <div className='h-5 w-16 rounded bg-muted/40' />
        </div>
    );
}
export { CartItemSkeleton }