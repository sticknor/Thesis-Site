// React
import React from 'react';
import { useAllWorksFromModule, formatWorkInfoLine } from './useWork';

function CascadeLeftModule({ module, base }) {
    const [works] = useAllWorksFromModule(module, base);
    const imageWidth = (100 / works.length) - 5;

    return (
        <div className='pageModule cascadeModule'>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'flex-start' }}>
                {
                    works.map((w, i) => (
                        <div
                            className='cascadeElement'
                            style={{
                                display: 'flex',
                                width: `${imageWidth}%`,
                                marginTop: imageWidth * 4 * (works.length - 1 - i),
                                flexDirection: 'column',
                                justifyContent: "center",
                                alignItems: 'center'
                            }}>
                            <img
                                alt="artwork"
                                className='workImage'
                                src={w.url}
                            />
                            {module.showWorkTitlesWithinModule && formatWorkInfoLine(w)}
                        </div>))
                }
            </div>
            {module.moduleTitle && <div class="workText">{module.moduleTitle}</div>}
            {module.moduleText && <div class="workText">{module.moduleText}</div>}
        </div >
    );
}

function CascadeRightModule({ module, base }) {
    const [works] = useAllWorksFromModule(module, base);
    const imageWidth = (100 / works.length) - 5;

    return (
        <div className='pageModule cascadeModule'>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'flex-start' }}>
                {
                    works.map((w, i) => (
                        <div
                            className='cascadeElement'
                            style={{
                                display: 'flex',
                                width: `${imageWidth}%`,
                                marginTop: imageWidth * 4 * i,
                                flexDirection: 'column',
                                justifyContent: "center",
                                alignItems: 'center'
                            }}>
                            <img
                                alt="artwork"
                                className='workImage'
                                src={w.url}
                            />
                            {module.showWorkTitlesWithinModule && formatWorkInfoLine(w)}
                        </div>)
                    )
                }
            </div>
            {module.moduleTitle && <div class="workText">{module.moduleTitle}</div>}
            {module.moduleText && <div class="workText">{module.moduleText}</div>}
        </div >
    );
}

export { CascadeLeftModule, CascadeRightModule }