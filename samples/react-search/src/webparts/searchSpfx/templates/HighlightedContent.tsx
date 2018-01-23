import * as React from 'react';
import { SPComponentLoader } from '@microsoft/sp-loader';

import styles from '../components/SearchSpfx.module.scss';
import { ISearchSpfxWebPartProps } from '../ISearchSpfxWebPartProps';

import * as moment from 'moment';

export interface IHighlightedContentTemplate extends ISearchSpfxWebPartProps {
    results: any[];
}

export default class HighlightedContentTemplate extends React.Component<IHighlightedContentTemplate, {}> {

    private getAuthorDisplayName(author: string): string {
        if (author !== null) {
            const splits: string[] = author.split('|');
            return splits[1].trim();
        } else {
            return "";
        }
    }
    private getThumbnailImage(siteLink: string, siteGuid: string, webGuid: string, itemGuid: string): string {
        let url = siteLink + "/_layouts/15/getpreview.ashx?guidSite=" + siteGuid + "&guidWeb=" + webGuid + "&guidFile=" + itemGuid + "&clientType=modernWebPart";
        console.log(url);
        url = url.split('{').join('');
        url = url.split('}').join('');
        url.toLowerCase();

        return url
    }
    public render(): JSX.Element {
        SPComponentLoader.loadCss('https://appsforoffice.microsoft.com/fabric/2.6.1/fabric.components.min.css');

        console.log(this);

        return (
            <div className={styles.searchSpfx}>
                <div className={styles.searchSpfx}>
                    {
                        this.props.results.map((result, index) => {
                            return (
                                <div className={styles.container}>
                                    <div className={styles.thumbImgContainer}><img src={this.getThumbnailImage(result.SPWebUrl, result.SiteID, result.WebId, result.UniqueID)} /></div>
                                    <div>
                                        <a className={styles.siteLink} href={result.SPWebUrl} target='_blank'>
                                            {result.SiteTitle}
                                        </a>
                                        <div className={styles.titleArea}>
                                            <div className={styles.titleText}>
                                                {result.Title}
                                            </div>
                                        </div>
                                        <div>
                                            <div>
                                                <div className={styles.profileContainer}>
                                                    <div className={styles.profileThumbContainer}>
                                                        <img className={styles.profileThumbImg} src="/_layouts/15/userphoto.aspx?size=S&accountname=peter-ross@greenlightsolutions.co.za" alt="Profile picture" />
                                                    </div>
                                                    <div className={styles.authorContainer}>
                                                        <span className={styles.author}>
                                                            {this.getAuthorDisplayName(result.EditorOWSUSER)}
                                                        </span>
                                                        <span className={styles.authorSubtext}>
                                                            Edited on date
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        );
    }
}
