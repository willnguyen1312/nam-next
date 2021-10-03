import React, { useEffect, useMemo } from 'react';
import axios from 'axios';
import { NextSeo } from 'next-seo';
import Image from 'next/image';

import { useVirtual } from 'react-virtual';
import { last } from 'lodash-es';
import { useInfiniteQuery } from 'react-query';

import { Stuff } from '../interfaces';

export default function App() {
    return (
        <main className="m-12 w-1/2 border-green-300 border-solid border-2 p-4">
            <NextSeo
                title="Next.js with Windowing playground"
                description="This is my playground with next.js, react-query, react-virtual and tailwind"
            />
            <Sample />
        </main>
    );
}

function Sample() {
    const { data, isFetchingNextPage, fetchNextPage, hasNextPage } =
        useInfiniteQuery<{
            data: Stuff[];
            nextId: number | null;
            previousId: number | null;
        }>(
            'stuff',
            async ({ pageParam = 0 }) => {
                const res = await axios.get('/api/stuff?cursor=' + pageParam);
                return res.data;
            },
            {
                getPreviousPageParam: (firstPage) =>
                    firstPage.previousId ?? false,
                getNextPageParam: (lastPage) => lastPage.nextId ?? false,
            }
        );

    const parentRef = React.useRef<HTMLDivElement>(null);

    const normalizedData: undefined | Stuff[] = useMemo(
        () =>
            data?.pages.reduce((acc: Stuff[], cur: { data: Stuff[] }) => {
                acc.push(...cur.data);
                return acc;
            }, []),
        [data?.pages]
    );

    const currentSize = normalizedData?.length ?? 0;
    const rowVirtualizer = useVirtual({
        size: hasNextPage ? currentSize + 1 : currentSize,
        parentRef,
        estimateSize: React.useCallback(() => 150, []),
        overscan: 5,
    });

    useEffect(() => {
        const lastItem = last(rowVirtualizer.virtualItems);
        if (!lastItem) {
            return;
        }

        if (
            lastItem.index === currentSize &&
            hasNextPage &&
            !isFetchingNextPage
        ) {
            fetchNextPage();
        }
    }, [
        currentSize,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        rowVirtualizer.virtualItems,
    ]);

    if (normalizedData) {
        return (
            <div ref={parentRef} className="h-[600px] w-full overflow-auto">
                <div
                    className="w-full relative"
                    style={{
                        height: `${rowVirtualizer.totalSize}px`,
                    }}
                >
                    {rowVirtualizer.virtualItems.map((virtualRow) => {
                        const isLoaderRow =
                            virtualRow.index > normalizedData.length - 1;
                        const project: Stuff = normalizedData[virtualRow.index];

                        return (
                            <div
                                key={virtualRow.index}
                                className="absolute top-0 left-0 w-full"
                                style={{
                                    height: `${virtualRow.size}px`,
                                    transform: `translateY(${virtualRow.start}px)`,
                                }}
                            >
                                {isLoaderRow ? (
                                    hasNextPage ? (
                                        'Loading more...'
                                    ) : (
                                        'Nothing more to load'
                                    )
                                ) : (
                                    <div>
                                        <div className="flex m-2">
                                            <Image
                                                width={100}
                                                height={100}
                                                src={project.imageUrl}
                                                alt={`Stuff ${project.id}`}
                                            />
                                            <p>{project.name}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }

    return <p>Loading...</p>;
}
