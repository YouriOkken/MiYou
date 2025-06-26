namespace MiYou.Shared.Interfaces
{
    public interface IMapper<ModelIn, ModelOut>
    {
        ModelOut Map(ModelIn modelToMap);
    }
}