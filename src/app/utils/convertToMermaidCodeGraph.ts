import { Characters, Relation } from "../models/Kiseki";

const convertToMermaidCode = (chara: Characters | null, relatives: Relation[] | null) => {
    let graph = `graph TD`;
    graph += `\n${chara?.name.split(' ').join('_')}`;

    relatives?.forEach((relative, i) => {
        graph += `\n${chara?.name.split(' ').join('_')} --> id${i}(${relative.name})`;
    })

    return graph;
}

export default convertToMermaidCode;