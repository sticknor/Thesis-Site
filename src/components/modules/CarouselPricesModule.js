// React
import React from 'react';
import { useAllWorksFromModule, formatWorkInfoLine } from './useWork';

function CarouselPricesModule({ module, base }) {
    const [works] = useAllWorksFromModule(module, base);

    return (
        <div className='pageModule carouselModule' style={{ marginBottom: 50 }}>
            <div style={{ background: 'rgb(200, 200, 200)', width: '100%', height: 1 }} />
            {module.carouselLabel && <div class="workText" style={{ margin: 50 }}>
                · {module.carouselLabel} ·
            </div>}
            <div style={{
                alignItems: 'flex-start',
                display: 'flex',
                flexDirection: 'row',
                overflowX: 'scroll',
                maxWidth: '100%',
                gap: 40,
                justifyContent: "space-between"
            }}>
                {
                    works.map((w) => (
                        <div style={{
                            display: 'flex',
                            minWidth: "40%",
                            flexDirection: 'column',
                            justifyContent: "center",
                            alignItems: "center",
                            textAlign: 'center',
                            gap: 10
                        }}>
                            <img
                                alt="artwork"
                                className='workImage'
                                src={w.url}
                                style={{ maxHeight: '50vh', width: '100%', minHeight: '50vh' }}
                            />
                            {module.showWorkTitlesWithinModule && formatWorkInfoLine(w)}
                            {w.description && <div className="workText" style={{ marginBottom: 15 }}>{w.description}</div>}
                            {w.price && <div className="workText">${w.price}.00</div>}
                        </div>)
                    )
                }
            </div >
            {module.moduleTitle && <div class="workText">{module.moduleTitle}</div>}
            {module.moduleText && <div class="workText">{module.moduleText}</div>}
        </div >
    );
}


export default CarouselPricesModule;