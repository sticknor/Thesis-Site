// React
import React from 'react';
import { useSingleWorkFromModule, formatWorkInfoLine } from './useWork';

function ImageHalfModule({ module, base }) {
    const [work] = useSingleWorkFromModule(module, base);

    if (!work) { return null }
    return (
        <div className='pageModule'>
            <img
                alt="artwork"
                className='workImage'
                style={{ width: "50%", height: "auto" }}
                src={work.url}
            />
            {module.showWorkTitlesWithinModule && formatWorkInfoLine(work)}
            {module.moduleTitle && <div class="workText">{module.moduleTitle}</div>}
            {module.moduleText && <div class="workText">{module.moduleText}</div>}
        </div>
    );
}


function ImageThreeQuarterModule({ module, base }) {
    const [work] = useSingleWorkFromModule(module, base);

    if (!work) { return null }
    return (
        <div className='pageModule'>
            <img
                alt="artwork"
                className='workImage'
                style={{ width: "75%", height: "auto" }}
                src={work.url}
            />
            {module.showWorkTitlesWithinModule && formatWorkInfoLine(work)}
            {module.moduleTitle && <div class="workText">{module.moduleTitle}</div>}
            {module.moduleText && <div class="workText">{module.moduleText}</div>}
        </div >
    );
}


function ImageFullModule({ module, base }) {
    const [work] = useSingleWorkFromModule(module, base);

    if (!work) { return null }
    return (
        <div className='pageModule imageFullModule'>
            <img
                alt="artwork"
                className='workImage'
                style={{ width: "100%", height: "auto" }}
                src={work.url}
            />
            {module.showWorkTitlesWithinModule && formatWorkInfoLine(work)}
            {module.moduleTitle && <div className="workText">{module.moduleTitle}</div>}
            {module.moduleText && <div className="workText">{module.moduleText}</div>}
        </div >
    );
}

export { ImageHalfModule, ImageThreeQuarterModule, ImageFullModule }