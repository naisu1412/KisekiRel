import request from 'request';
import cheerio from 'cheerio';
import { Characters, Relation } from '../models/Kiseki';






const kisekiReq = {

    getAllCharacters: (startingLetter: string) => {
        let url = `https://kiseki.fandom.com/wiki/Category:Characters?from=${startingLetter}`;
        return new Promise<Characters[]>(
            (resolve) => {
                request(url, (error, response, html) => {
                    if (!error && response.statusCode === 200) {
                        const $ = cheerio.load(html);
                        var attempt: Characters[] = [];

                        $('.category-page__members-for-char li').each((i, el) => {
                            var c = {
                                name: $(el).find(".category-page__member-link").text(),
                                image: "",  // issue with web scraping images
                                url: $(el).find('.category-page__member .category-page__member-left a').attr('href')
                            }

                            let rule = /Characters/
                            if (!c.name.match(rule))
                                attempt.push(c);

                        })

                        resolve(attempt);
                    }
                })
            }
        )
    },
    getCharacterRelations: (name: string) => {
        let charaUrl = `https://kiseki.fandom.com/wiki/${name}`;

        return new Promise<Relation[]>(
            (resolve) => {
                request(charaUrl, (error, response, html) => {
                    if (!error && response.statusCode === 200) {
                        const $ = cheerio.load(html);
                        var attempt: Relation[] = [];

                        $(`div[data-source='relatives'] li`).each((i, el) => {
                            var c = {
                                name: $(el).text().split("(")[0],
                                relation: `(${$(el).text().split("(")[1]}`
                            }

                            attempt.push(c);
                        })

                        resolve(attempt);
                    }
                })
            }
        )
    }

}

const agent = { kisekiReq };
export default agent;
